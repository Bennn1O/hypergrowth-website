"use client";

/* Hallmark · component: multi-step form · genre: atmospheric · theme: HyperGrowth
 * states: default · hover · focus · active · disabled · loading · error · success
 * contrast: pass · motion: reduced-motion aware
 * pre-emit critique: P4 H5 E4 S5 R4 V4
 */

import {
  Alert02Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
} from "hugeicons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";

import {
  cleanTypeformText,
  getFieldByRef,
  getNextStep,
  getProgress,
  getScalabilityResult,
  sanitizeAnswers,
  SCALABILITY_CONTACT_REFS,
  SCALABILITY_TEST_STEPS,
  SCALABILITY_TEST_STORAGE_KEY,
  SCALABILITY_WELCOME,
  validateField,
} from "@/lib/scalability-test";
import type {
  Answers,
  AnswerValue,
  FormStep,
  ScalabilityResult,
  TypeformChoice,
} from "@/lib/scalability-test";

type Phase = "question" | "result" | "submitting" | "welcome";

interface StoredDraft {
  answers: Answers;
  currentRef: string;
  history: string[];
}

const transition = { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] as const };

function getStringAnswer(answers: Answers, ref: string): string {
  const value = answers[ref];
  return typeof value === "string" ? value : "";
}

function replaceRecall(
  text: string,
  field: FormStep,
  answers: Answers,
  score: number,
): string {
  const firstName = getStringAnswer(
    answers,
    SCALABILITY_CONTACT_REFS.firstName,
  );
  const company = getStringAnswer(answers, SCALABILITY_CONTACT_REFS.company);

  if (field.ref === "2ff5eccb-ed55-4130-8fb2-e65da57132fe") {
    return `Super ${firstName}, on va voir comment ${company} peut scaler au maximum.`;
  }

  return cleanTypeformText(text)
    .replaceAll("{Nom de l'entreprise}", company)
    .replaceAll("{{var:score}}", String(score));
}

function ChoiceLabel({
  choice,
  index,
}: {
  choice: TypeformChoice;
  index: number;
}) {
  return (
    <>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-xs text-white/55">
        {String.fromCharCode(65 + index)}
      </span>
      <span className="text-left text-sm leading-6 text-white/85 sm:text-base">
        {choice.label}
      </span>
    </>
  );
}

export function ScalabilityTestForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentRef, setCurrentRef] = useState(SCALABILITY_TEST_STEPS[0].ref);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [phase, setPhase] = useState<Phase>("welcome");
  const [result, setResult] = useState<ScalabilityResult | null>(null);
  const [selectionTimer, setSelectionTimer] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

  const field = getFieldByRef(currentRef) ?? SCALABILITY_TEST_STEPS[0];
  const value = answers[field.ref];
  const score = getScalabilityResult(answers).score;
  const progress = getProgress(currentRef, answers);

  useEffect(() => {
    if (phase === "question") {
      const draft: StoredDraft = { answers, currentRef, history };
      window.localStorage.setItem(
        SCALABILITY_TEST_STORAGE_KEY,
        JSON.stringify(draft),
      );
    }
  }, [answers, currentRef, history, phase]);

  useEffect(() => {
    const nativeInputKeepsFocus =
      field.type === "short_text" ||
      field.type === "long_text" ||
      field.type === "email" ||
      field.type === "phone_number" ||
      field.type === "dropdown";

    if (phase !== "question" || nativeInputKeepsFocus) return;

    const animationFrame = window.requestAnimationFrame(() =>
      headingRef.current?.focus({ preventScroll: true }),
    );

    return () => window.cancelAnimationFrame(animationFrame);
  }, [field.ref, field.type, phase]);

  useEffect(
    () => () => {
      if (selectionTimer !== null) window.clearTimeout(selectionTimer);
    },
    [selectionTimer],
  );

  function startTest() {
    const rawDraft = window.localStorage.getItem(SCALABILITY_TEST_STORAGE_KEY);

    if (rawDraft) {
      try {
        const draft = JSON.parse(rawDraft) as Partial<StoredDraft>;
        const restoredAnswers = sanitizeAnswers(draft.answers);
        if (draft.currentRef && getFieldByRef(draft.currentRef)) {
          setAnswers(restoredAnswers);
          setCurrentRef(draft.currentRef);
          setHistory(
            Array.isArray(draft.history)
              ? draft.history.filter((ref) => Boolean(getFieldByRef(ref)))
              : [],
          );
        }
      } catch {
        window.localStorage.removeItem(SCALABILITY_TEST_STORAGE_KEY);
      }
    }

    setError("");
    setPhase("question");
  }

  function updateAnswer(nextValue: AnswerValue) {
    setAnswers((current) => ({ ...current, [field.ref]: nextValue }));
    setError("");
  }

  async function submit(nextAnswers: Answers) {
    setError("");
    setPhase("submitting");

    try {
      const response = await fetch("/api/scalability-test", {
        body: JSON.stringify({ answers: nextAnswers, website: honeypot }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = (await response.json()) as {
        error?: string;
        fields?: Array<{ fieldRef: string; message: string }>;
        ok?: boolean;
        result?: ScalabilityResult;
      };

      if (!response.ok || !data.ok) {
        const invalidField = data.fields?.[0];
        if (invalidField && getFieldByRef(invalidField.fieldRef)) {
          setCurrentRef(invalidField.fieldRef);
          setError(invalidField.message);
        } else {
          setError(
            data.error ||
              "Le résultat n'a pas pu être enregistré. Réessaie dans un instant.",
          );
        }
        setPhase("question");
        return;
      }

      setResult(data.result ?? getScalabilityResult(nextAnswers));
      window.localStorage.removeItem(SCALABILITY_TEST_STORAGE_KEY);
      setPhase("result");
    } catch {
      setError(
        "Le résultat n'a pas pu être enregistré. Vérifie ta connexion puis réessaie.",
      );
      setPhase("question");
    }
  }

  async function advance(nextAnswers = answers) {
    const validationError = validateField(field, nextAnswers[field.ref]);
    if (validationError) {
      setError(validationError);
      return;
    }

    const next = getNextStep(field.ref, nextAnswers);
    if (!next || next.type === "outcome") {
      await submit(nextAnswers);
      return;
    }

    setAnswers(nextAnswers);
    setHistory((current) => [...current, field.ref]);
    setCurrentRef(next.ref);
    setError("");
  }

  function goBack() {
    const previousRef = history.at(-1);
    if (!previousRef) return;
    setHistory((current) => current.slice(0, -1));
    setCurrentRef(previousRef);
    setError("");
  }

  function selectChoice(
    choiceRef: string,
    event: MouseEvent<HTMLButtonElement>,
  ) {
    const multiple = Boolean(field.properties?.allow_multiple_selection);
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      updateAnswer(
        current.includes(choiceRef)
          ? current.filter((ref) => ref !== choiceRef)
          : [...current, choiceRef],
      );
      return;
    }

    const nextAnswers = { ...answers, [field.ref]: choiceRef };
    setAnswers(nextAnswers);
    setError("");
    if (selectionTimer !== null) window.clearTimeout(selectionTimer);

    const delay = event.detail === 0 || reduceMotion ? 0 : 180;
    const timer = window.setTimeout(() => {
      setSelectionTimer(null);
      void advance(nextAnswers);
    }, delay);
    setSelectionTimer(timer);
  }

  function selectScale(number: number, event: MouseEvent<HTMLButtonElement>) {
    const nextAnswers = { ...answers, [field.ref]: number };
    setAnswers(nextAnswers);
    setError("");
    if (selectionTimer !== null) window.clearTimeout(selectionTimer);

    const delay = event.detail === 0 || reduceMotion ? 0 : 180;
    const timer = window.setTimeout(() => {
      setSelectionTimer(null);
      void advance(nextAnswers);
    }, delay);
    setSelectionTimer(timer);
  }

  function handleInputKeyDown(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (event.key !== "Enter") return;
    if (
      event.currentTarget instanceof HTMLTextAreaElement &&
      !event.metaKey &&
      !event.ctrlKey
    )
      return;
    event.preventDefault();
    void advance();
  }

  function resetTest() {
    window.localStorage.removeItem(SCALABILITY_TEST_STORAGE_KEY);
    setAnswers({});
    setCurrentRef(SCALABILITY_TEST_STEPS[0].ref);
    setError("");
    setHistory([]);
    setResult(null);
    setPhase("welcome");
  }

  function renderChoices() {
    const choices = field.properties?.choices ?? [];
    const multiple = Boolean(field.properties?.allow_multiple_selection);
    const selected = Array.isArray(value)
      ? value
      : typeof value === "string"
        ? [value]
        : [];
    const selectedRefs = new Set(selected);

    if (field.type === "picture_choice") {
      return (
        <div
          aria-labelledby={`${field.id}-title`}
          aria-required={field.validations?.required}
          className="grid gap-3 sm:grid-cols-2"
          role={multiple ? "group" : "radiogroup"}
        >
          {choices.map((choice, index) => {
            const isSelected = selectedRefs.has(choice.ref);
            return (
              <button
                aria-checked={isSelected}
                className={`group overflow-hidden rounded-2xl border text-left transition-colors active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid ${
                  isSelected
                    ? "border-hpg-orchid bg-hpg-violet-dark"
                    : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
                }`}
                key={choice.ref}
                onClick={(event) => selectChoice(choice.ref, event)}
                role={multiple ? "checkbox" : "radio"}
                type="button"
              >
                {choice.attachment?.href ? (
                  <div className="relative aspect-video overflow-hidden bg-black/20">
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      src={choice.attachment.href}
                    />
                  </div>
                ) : null}
                <span className="flex min-h-14 items-center gap-3 px-4 py-3">
                  <ChoiceLabel choice={choice} index={index} />
                </span>
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <div
        aria-labelledby={`${field.id}-title`}
        aria-required={field.validations?.required}
        className="grid gap-2"
        role={multiple ? "group" : "radiogroup"}
      >
        {choices.map((choice, index) => {
          const isSelected = selectedRefs.has(choice.ref);
          return (
            <button
              aria-checked={isSelected}
              className={`flex min-h-14 w-full items-center gap-3 rounded-xl border px-4 py-3 transition-colors active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid ${
                isSelected
                  ? "border-hpg-orchid bg-hpg-violet-dark"
                  : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
              }`}
              key={choice.ref}
              onClick={(event) => selectChoice(choice.ref, event)}
              role={multiple ? "checkbox" : "radio"}
              type="button"
            >
              <ChoiceLabel choice={choice} index={index} />
              {isSelected ? (
                <CheckmarkCircle02Icon className="ml-auto size-5 shrink-0 text-hpg-orchid" />
              ) : null}
            </button>
          );
        })}
      </div>
    );
  }

  function renderInput() {
    const textValue = typeof value === "string" ? value : "";
    const inputClass = `min-h-14 w-full rounded-xl border bg-white/5 px-4 text-base text-white outline-2 outline-offset-1 outline-transparent transition-colors placeholder:text-white/30 focus:border-hpg-orchid focus:outline-hpg-orchid ${error ? "border-red-400" : "border-white/15"}`;
    const errorId = `${field.id}-error`;

    if (field.type === "long_text") {
      return (
        <textarea
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          aria-labelledby={`${field.id}-title`}
          aria-required={field.validations?.required}
          autoFocus
          className={`${inputClass} min-h-40 resize-y py-4 leading-7`}
          onChange={(event) => updateAnswer(event.target.value)}
          onKeyDown={handleInputKeyDown}
          value={textValue}
        />
      );
    }

    if (field.type === "dropdown") {
      return (
        <select
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          aria-labelledby={`${field.id}-title`}
          aria-required={field.validations?.required}
          autoFocus
          className={inputClass}
          onChange={(event) => updateAnswer(event.target.value)}
          value={textValue}
        >
          <option value="">Sélectionne une réponse</option>
          {(field.properties?.choices ?? []).map((choice) => (
            <option key={choice.ref} value={choice.ref}>
              {choice.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "opinion_scale") {
      const steps = field.properties?.steps ?? 11;
      const minimum = field.properties?.start_at_one ? 1 : 0;
      const maximum = field.properties?.start_at_one ? steps : steps - 1;
      const scale = Array.from(
        { length: maximum - minimum + 1 },
        (_, index) => minimum + index,
      );

      return (
        <div className="space-y-3">
          <div
            aria-labelledby={`${field.id}-title`}
            aria-required={field.validations?.required}
            className="grid grid-cols-4 gap-2 sm:grid-cols-11"
            role="radiogroup"
          >
            {scale.map((number) => {
              const isSelected = value === number;
              return (
                <button
                  aria-checked={isSelected}
                  className={`aspect-square min-h-11 rounded-xl border text-sm font-medium transition-colors active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid ${
                    isSelected
                      ? "border-hpg-orchid bg-hpg-orchid text-hpg-ink"
                      : "border-white/10 bg-white/5 text-white/75 hover:border-white/30"
                  }`}
                  key={number}
                  onClick={(event) => selectScale(number, event)}
                  role="radio"
                  type="button"
                >
                  {number}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between gap-4 text-xs leading-5 text-white/45">
            <span>{field.properties?.labels?.left}</span>
            <span className="text-center">
              {field.properties?.labels?.center}
            </span>
            <span className="text-right">
              {field.properties?.labels?.right}
            </span>
          </div>
        </div>
      );
    }

    if (field.type === "multiple_choice" || field.type === "picture_choice")
      return renderChoices();

    return (
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        aria-labelledby={`${field.id}-title`}
        aria-required={field.validations?.required}
        autoComplete={
          field.type === "email"
            ? "email"
            : field.type === "phone_number"
              ? "tel"
              : "off"
        }
        autoFocus
        className={inputClass}
        inputMode={
          field.type === "phone_number"
            ? "tel"
            : field.type === "email"
              ? "email"
              : "text"
        }
        onChange={(event) => updateAnswer(event.target.value)}
        onKeyDown={handleInputKeyDown}
        placeholder={
          field.type === "email"
            ? "prenom@entreprise.com"
            : field.type === "phone_number"
              ? "+33 6 12 34 56 78"
              : "Ex. Léa"
        }
        type={
          field.type === "email"
            ? "email"
            : field.type === "phone_number"
              ? "tel"
              : "text"
        }
        value={textValue}
      />
    );
  }

  if (phase === "welcome") {
    return (
      <div className="flex min-h-160 items-center justify-center px-5 py-14 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="mb-5 rounded-full border border-hpg-orchid/25 bg-hpg-orchid/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-hpg-orchid">
            Diagnostic de scalabilité
          </span>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            {cleanTypeformText(SCALABILITY_WELCOME.title)}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-hpg-silver sm:text-base">
            {cleanTypeformText(
              SCALABILITY_WELCOME.properties.description || "",
            )}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/50">
            <span>50 questions</span>
            <span>Environ 10 minutes</span>
            <span>Progression enregistrée</span>
          </div>
          <button
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-xl border border-hpg-violet-border bg-hpg-violet-btn px-6 font-medium text-white transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid"
            onClick={startTest}
            type="button"
          >
            {cleanTypeformText(
              SCALABILITY_WELCOME.properties.button_text || "Commencer le test",
            )}
            <ArrowRight01Icon className="size-5" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <div className="flex min-h-160 items-center justify-center px-5 py-14 sm:px-10">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          transition={transition}
        >
          <CheckmarkCircle02Icon className="mb-6 size-12 text-hpg-orchid" />
          <p className="text-xs font-medium uppercase tracking-widest text-white/45">
            Ton score de scalabilité
          </p>
          <p className="mt-3 font-instrument-italic text-7xl italic leading-none text-hpg-orchid">
            {result.score}
          </p>
          <h2 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {result.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-hpg-silver sm:text-base">
            {result.description}
          </p>
          <a
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-xl border border-hpg-violet-border bg-hpg-violet-btn px-6 font-medium text-white transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid"
            href={result.redirectUrl}
            rel="noreferrer"
            target="_blank"
          >
            {result.buttonText}
            <ArrowUpRight01Icon className="size-5" />
          </a>
          <button
            className="mt-5 min-h-11 whitespace-nowrap rounded-lg px-2 text-sm text-white/45 underline-offset-4 hover:text-white hover:underline active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid"
            onClick={resetTest}
            type="button"
          >
            Recommencer le test
          </button>
        </motion.div>
      </div>
    );
  }

  const title = replaceRecall(field.title, field, answers, score);
  const description = field.properties?.description
    ? replaceRecall(field.properties.description, field, answers, score)
    : "";
  const isStatement = field.type === "statement";
  const needsManualContinue =
    isStatement ||
    field.type === "short_text" ||
    field.type === "long_text" ||
    field.type === "email" ||
    field.type === "phone_number" ||
    field.type === "dropdown" ||
    Boolean(field.properties?.allow_multiple_selection);

  return (
    <div className="flex min-h-160 flex-col">
      <div className="border-b border-white/10 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
            aria-label="Progression du test"
            aria-valuemax={progress.total}
            aria-valuemin={1}
            aria-valuenow={progress.current}
            role="progressbar"
          >
            <div
              className="h-full origin-left rounded-full bg-hpg-orchid transition-transform duration-200"
              style={{ transform: `scaleX(${progress.percent / 100})` }}
            />
          </div>
          <span className="whitespace-nowrap text-xs tabular-nums text-white/45">
            {progress.current} / {progress.total}
          </span>
        </div>
      </div>

      <div className="flex flex-1 items-center px-5 py-10 sm:px-10 sm:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="mx-auto w-full max-w-3xl"
            exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            key={field.ref}
            transition={transition}
          >
            {field.group ? (
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-hpg-orchid/70">
                {cleanTypeformText(field.group.title)}
              </p>
            ) : null}
            <h2
              className="min-w-0 scroll-mt-32 break-words text-2xl font-semibold leading-tight text-white outline-none sm:text-4xl"
              id={`${field.id}-title`}
              ref={headingRef}
              tabIndex={-1}
            >
              {title}
              {field.validations?.required ? (
                <span className="ml-1 text-hpg-orchid" aria-label="requis">
                  *
                </span>
              ) : null}
            </h2>
            {description ? (
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-hpg-silver sm:text-base">
                {description}
              </p>
            ) : null}

            <div className="mt-7">{isStatement ? null : renderInput()}</div>

            <input
              aria-hidden="true"
              autoComplete="off"
              className="pointer-events-none absolute -left-full opacity-0"
              name="website"
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex={-1}
              value={honeypot}
            />

            <div className="mt-4 min-h-6">
              {error ? (
                <div
                  className="flex items-start gap-2 text-sm leading-6 text-red-300"
                  id={`${field.id}-error`}
                  role="alert"
                >
                  <Alert02Icon className="mt-0.5 size-5 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-lg px-2 text-sm text-white/50 transition-colors hover:text-white active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid disabled:invisible disabled:cursor-not-allowed"
                disabled={!history.length || phase === "submitting"}
                onClick={goBack}
                type="button"
              >
                <ArrowLeft01Icon className="size-4" />
                Retour
              </button>

              {needsManualContinue ? (
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-xl border border-hpg-violet-border bg-hpg-violet-btn px-5 text-sm font-medium text-white transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark hover:text-hpg-orchid active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid disabled:cursor-wait disabled:opacity-60"
                  disabled={phase === "submitting"}
                  onClick={() => void advance()}
                  type="button"
                >
                  {phase === "submitting" ? "Enregistrement…" : "Continuer"}
                  {phase !== "submitting" ? (
                    <ArrowRight01Icon className="size-5" />
                  ) : null}
                </button>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
