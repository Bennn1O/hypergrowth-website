"use client";

/* Hallmark · component: immersion questionnaire · genre: atmospheric · theme: HyperGrowth
 * states: default · hover · focus · active · disabled · loading · error · success
 * contrast: pass · motion: reduced-motion aware
 * pre-emit critique: P5 H5 E4 S5 R4 V4
 */

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

import {
  ImmersionQuestionScreen,
  ImmersionSuccess,
  ImmersionWelcome,
} from "@/components/forms/immersion-questionnaire-screen";
import {
  getImmersionField,
  getImmersionProgress,
  getImmersionStorageKey,
  IMMERSION_QUESTIONNAIRE_STEPS,
  isImmersionAnswered,
  sanitizeImmersionAnswers,
} from "@/lib/immersion-questionnaire";
import type {
  ImmersionAnswers,
  ImmersionAnswerValue,
} from "@/lib/immersion-questionnaire";

type Phase = "question" | "submitting" | "success" | "welcome";

interface ImmersionQuestionnaireFormProps {
  hasAccess?: boolean;
}

interface StoredDraft {
  answers: ImmersionAnswers;
  currentRef: string;
  history: string[];
}

const MAX_DECK_SIZE = 10 * 1024 * 1024;

function readStoredDraft(): Partial<StoredDraft> | null {
  try {
    const rawDraft = window.sessionStorage.getItem(getImmersionStorageKey());
    return rawDraft ? (JSON.parse(rawDraft) as Partial<StoredDraft>) : null;
  } catch {
    return null;
  }
}

function writeStoredDraft(draft: StoredDraft) {
  try {
    window.sessionStorage.setItem(
      getImmersionStorageKey(),
      JSON.stringify(draft),
    );
  } catch {
    // Le stockage local est une aide facultative, jamais un prérequis.
  }
}

function clearStoredDraft() {
  try {
    window.sessionStorage.removeItem(getImmersionStorageKey());
  } catch {
    // La confirmation ne dépend pas du nettoyage du brouillon local.
  }
}

export function ImmersionQuestionnaireForm({
  hasAccess = false,
}: ImmersionQuestionnaireFormProps) {
  const [answers, setAnswers] = useState<ImmersionAnswers>({});
  const [currentRef, setCurrentRef] = useState(
    IMMERSION_QUESTIONNAIRE_STEPS[0].ref,
  );
  const [deck, setDeck] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isNavigationLocked, setIsNavigationLocked] = useState(false);
  const [phase, setPhase] = useState<Phase>("welcome");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );
  const selectionTimerRef = useRef<number | null>(null);
  const submissionIdRef = useRef("");
  const reduceMotion = useReducedMotion();

  const field =
    getImmersionField(currentRef) ?? IMMERSION_QUESTIONNAIRE_STEPS[0];
  const value = answers[field.ref];
  const progress = getImmersionProgress(field.ref);
  const isLastQuestion =
    field.ref ===
    IMMERSION_QUESTIONNAIRE_STEPS[IMMERSION_QUESTIONNAIRE_STEPS.length - 1].ref;
  const hasCurrentAnswer =
    field.type === "file_upload" ? Boolean(deck) : isImmersionAnswered(value);

  useEffect(() => {
    if (phase !== "question" || !hasAccess) return;
    writeStoredDraft({ answers, currentRef, history });
  }, [answers, currentRef, hasAccess, history, phase]);

  useEffect(() => {
    if (phase !== "question") return;

    const isTextField =
      field.type === "short_text" || field.type === "long_text";
    const animationFrame = window.requestAnimationFrame(() => {
      if (isTextField) {
        textFieldRef.current?.focus({ preventScroll: true });
        return;
      }
      headingRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [field.ref, field.type, phase]);

  useEffect(
    () => () => {
      if (selectionTimerRef.current !== null) {
        window.clearTimeout(selectionTimerRef.current);
      }
    },
    [],
  );

  function startQuestionnaire() {
    if (!hasAccess) return;

    const draft = readStoredDraft();
    if (draft?.currentRef && getImmersionField(draft.currentRef)) {
      setAnswers(sanitizeImmersionAnswers(draft.answers));
      setCurrentRef(draft.currentRef);
      setHistory(
        Array.isArray(draft.history)
          ? draft.history.filter((ref) => Boolean(getImmersionField(ref)))
          : [],
      );
    }

    setError("");
    setPhase("question");
  }

  function updateAnswer(nextValue: ImmersionAnswerValue) {
    setAnswers((current) => ({
      ...current,
      [field.ref]: nextValue,
    }));
    setError("");
  }

  async function submit(nextAnswers: ImmersionAnswers) {
    if (!hasAccess) {
      setError(
        "Ce lien est incomplet. Demande un nouveau lien à l’équipe HyperGrowth.",
      );
      return;
    }

    setError("");
    setPhase("submitting");

    try {
      const formData = new FormData();
      formData.set(
        "payload",
        JSON.stringify({
          answers: nextAnswers,
          submissionId:
            submissionIdRef.current ||
            (submissionIdRef.current = window.crypto.randomUUID()),
        }),
      );
      if (deck) formData.set("deck", deck);

      const response = await fetch("/api/immersion-questionnaire", {
        body: formData,
        method: "POST",
      });
      const data = (await response.json()) as {
        error?: string;
        ok?: boolean;
      };

      if (!response.ok || !data.ok) {
        setError(
          data.error ||
            "Tes réponses n’ont pas pu être enregistrées. Réessaie dans un instant.",
        );
        setPhase("question");
        return;
      }

      clearStoredDraft();
      setPhase("success");
    } catch {
      setError(
        "Tes réponses n’ont pas pu être enregistrées. Vérifie ta connexion puis réessaie.",
      );
      setPhase("question");
    }
  }

  async function advance(nextAnswers = answers) {
    if (isLastQuestion) {
      await submit(nextAnswers);
      return;
    }

    const currentIndex = IMMERSION_QUESTIONNAIRE_STEPS.findIndex(
      (step) => step.ref === field.ref,
    );
    const nextField = IMMERSION_QUESTIONNAIRE_STEPS[currentIndex + 1];
    if (!nextField) return;

    setAnswers(nextAnswers);
    setHistory((current) => [...current, field.ref]);
    setCurrentRef(nextField.ref);
    setError("");
  }

  function goBack() {
    if (isNavigationLocked) return;

    const previousRef = history.at(-1);
    if (!previousRef) return;

    setHistory((current) => current.slice(0, -1));
    setCurrentRef(previousRef);
    setError("");
  }

  function scheduleAdvance(nextAnswers: ImmersionAnswers) {
    if (selectionTimerRef.current !== null) return;

    setIsNavigationLocked(true);
    const delay = reduceMotion ? 0 : 180;
    selectionTimerRef.current = window.setTimeout(() => {
      selectionTimerRef.current = null;
      setIsNavigationLocked(false);
      void advance(nextAnswers);
    }, delay);
  }

  function selectChoice(choiceRef: string) {
    const nextAnswers = { ...answers, [field.ref]: choiceRef };
    setAnswers(nextAnswers);
    setError("");
    scheduleAdvance(nextAnswers);
  }

  function selectScale(number: number) {
    const nextAnswers = { ...answers, [field.ref]: number };
    setAnswers(nextAnswers);
    setError("");
    scheduleAdvance(nextAnswers);
  }

  function handleInputKeyDown(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (event.key !== "Enter") return;
    if (
      event.currentTarget instanceof HTMLTextAreaElement &&
      !event.metaKey &&
      !event.ctrlKey
    ) {
      return;
    }

    event.preventDefault();
    void advance();
  }

  function handleDeckChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_DECK_SIZE) {
      event.target.value = "";
      setDeck(null);
      setError("Le deck dépasse 10 Mo. Choisis un fichier plus léger.");
      return;
    }

    const extension = file.name.split(".").at(-1)?.toLowerCase();
    if (!extension || !["key", "pdf", "ppt", "pptx"].includes(extension)) {
      event.target.value = "";
      setDeck(null);
      setError("Ajoute un fichier PDF, PowerPoint ou Keynote.");
      return;
    }

    setDeck(file);
    setError("");
  }

  if (phase === "welcome") {
    return (
      <ImmersionWelcome
        hasValidAccess={hasAccess}
        onStart={startQuestionnaire}
      />
    );
  }

  if (phase === "success") {
    return <ImmersionSuccess reduceMotion={reduceMotion} />;
  }

  return (
    <ImmersionQuestionScreen
      deck={deck}
      error={error}
      field={field}
      headingRef={headingRef}
      inputRef={(node) => {
        textFieldRef.current = node;
      }}
      navigation={{
        hasCurrentAnswer,
        historyLength: history.length,
        isLastQuestion,
        isLocked: isNavigationLocked,
        isSubmitting: phase === "submitting",
      }}
      onAnswer={updateAnswer}
      onBack={goBack}
      onChoice={selectChoice}
      onDeckChange={handleDeckChange}
      onDeckRemove={() => {
        setDeck(null);
        setError("");
      }}
      onScale={selectScale}
      onSubmit={() => void advance()}
      onTextKeyDown={handleInputKeyDown}
      progress={progress}
      reduceMotion={reduceMotion}
      value={value}
    />
  );
}
