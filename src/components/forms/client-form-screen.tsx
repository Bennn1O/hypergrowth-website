import {
  Alert02Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  Shield01Icon,
} from "hugeicons-react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import type { ChangeEvent, FormEvent, KeyboardEvent, RefObject } from "react";

import {
  FormQuestionInput,
  type TextElement,
} from "@/components/forms/client-form-field";
import {
  cleanTypeformText,
  isRequired,
  type AnswerValue,
  type FormDefinition,
  type FormField,
} from "@/lib/client-forms";

const transition = {
  duration: 0.22,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-hpg-violet-border bg-hpg-violet-btn px-4 text-center text-sm font-medium text-white transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid disabled:cursor-not-allowed disabled:opacity-45 sm:px-6";

const ghostButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-2 text-sm text-white/65 transition-colors hover:text-white active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid disabled:cursor-not-allowed";

interface FormWelcomeProps {
  definition: FormDefinition;
  onRestart: () => void;
  onStart: () => void;
  resume: { answered: number; question: number } | null;
}

export function FormWelcome({
  definition,
  onRestart,
  onStart,
  resume,
}: FormWelcomeProps) {
  const { welcome_screen: welcome } = definition;

  return (
    <div className="flex min-h-160 items-center justify-center px-5 py-14 sm:px-10">
      <div className="mx-auto flex w-full min-w-0 max-w-2xl flex-col items-center text-center">
        <Shield01Icon className="mb-6 size-9 text-hpg-orchid" />
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          {cleanTypeformText(welcome.title)}
        </h2>
        <p className="mt-5 w-full max-w-xl whitespace-pre-line break-words text-sm leading-7 text-hpg-silver sm:text-base">
          {cleanTypeformText(welcome.description)}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/60">
          <span>{definition.fields.length} questions</span>
          <span>Environ {definition.estimated_minutes} minutes</span>
          <span>Progression enregistrée</span>
        </div>

        {resume ? (
          <div className="mt-8 w-full max-w-lg rounded-xl border border-hpg-orchid/40 bg-hpg-orchid/10 p-5 text-left">
            <p className="text-sm leading-6 text-white">
              Tu as déjà répondu à {resume.answered} question
              {resume.answered > 1 ? "s" : ""}. Tes réponses sont conservées.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                className={primaryButtonClass}
                onClick={onStart}
                type="button"
              >
                Reprendre à la question {resume.question}
                <ArrowRight01Icon className="size-5" />
              </button>
              <button
                className={ghostButtonClass}
                onClick={onRestart}
                type="button"
              >
                Recommencer depuis le début
              </button>
            </div>
          </div>
        ) : (
          <button
            className={`${primaryButtonClass} mt-8 w-full sm:w-auto`}
            onClick={onStart}
            type="button"
          >
            {cleanTypeformText(welcome.button_text)}
            <ArrowRight01Icon className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}

interface FormSuccessProps {
  definition: FormDefinition;
  nextHref?: string;
  reduceMotion: boolean | null;
}

export function FormSuccess({
  definition,
  nextHref,
  reduceMotion,
}: FormSuccessProps) {
  const { thank_you_screen: thankYou } = definition;

  return (
    <div className="flex min-h-160 items-center justify-center px-5 py-14 sm:px-10">
      <LazyMotion features={domAnimation}>
        <m.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex w-full min-w-0 max-w-xl flex-col items-center text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          transition={transition}
        >
          <CheckmarkCircle02Icon className="mb-6 size-12 text-hpg-orchid" />
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {cleanTypeformText(thankYou.title)}
          </h2>
          <p className="mt-4 text-sm leading-7 text-hpg-silver sm:text-base">
            {thankYou.summary}
          </p>
          <p className="mt-2 text-sm leading-7 text-white/60">
            {cleanTypeformText(thankYou.description)}
          </p>
          {nextHref && thankYou.button_text ? (
            <a
              className={`${primaryButtonClass} mt-8`}
              href={nextHref}
              rel="noreferrer"
              target="_blank"
            >
              {thankYou.button_text}
              <ArrowRight01Icon className="size-5" />
            </a>
          ) : null}
        </m.div>
      </LazyMotion>
    </div>
  );
}

export function FormAlreadySubmitted({
  submittedAt,
}: {
  submittedAt: string | null;
}) {
  const date = submittedAt ? new Date(submittedAt) : null;
  const formatted =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : null;

  return (
    <div className="flex min-h-160 items-center justify-center px-5 py-14 sm:px-10">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <CheckmarkCircle02Icon className="mb-6 size-12 text-hpg-orchid" />
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Ce formulaire a déjà été envoyé
          {formatted ? ` le ${formatted}` : ""}.
        </h2>
        <p className="mt-4 text-sm leading-7 text-hpg-silver sm:text-base">
          L’équipe HyperGrowth a bien reçu tes réponses. Pour les modifier,
          contacte directement ton interlocuteur.
        </p>
      </div>
    </div>
  );
}

export function FormLinkError({ message }: { message: string }) {
  return (
    <div className="flex min-h-160 items-center justify-center px-5 py-14">
      <div
        className="flex max-w-lg items-start gap-3 rounded-xl border border-red-300/35 bg-red-300/10 p-5 text-sm leading-6 text-red-200"
        role="alert"
      >
        <Alert02Icon className="mt-0.5 size-5 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
}

interface FormQuestionScreenProps {
  deck: File | null;
  error: string;
  field: FormField;
  headingRef: RefObject<HTMLHeadingElement | null>;
  inputRef: (node: TextElement | null) => void;
  navigation: {
    canGoBack: boolean;
    hasCurrentAnswer: boolean;
    isLastQuestion: boolean;
    isLocked: boolean;
    isSubmitting: boolean;
  };
  onAnswer: (value: AnswerValue) => void;
  onBack: () => void;
  onChoice: (choiceRef: string) => void;
  onDeckChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDeckRemove: () => void;
  onScale: (value: number) => void;
  onSubmit: () => void;
  onTextKeyDown: (event: KeyboardEvent<TextElement>) => void;
  progress: { current: number; percent: number; total: number };
  reduceMotion: boolean | null;
  saveState: "error" | "idle" | "saved" | "saving";
  value?: AnswerValue;
}

const SAVE_LABELS = {
  error: "Enregistrement en attente",
  idle: "",
  saved: "Réponses enregistrées",
  saving: "Enregistrement…",
};

export function FormQuestionScreen({
  deck,
  error,
  field,
  headingRef,
  inputRef,
  navigation,
  onAnswer,
  onBack,
  onChoice,
  onDeckChange,
  onDeckRemove,
  onScale,
  onSubmit,
  onTextKeyDown,
  progress,
  reduceMotion,
  saveState,
  value,
}: FormQuestionScreenProps) {
  const {
    canGoBack,
    hasCurrentAnswer,
    isLastQuestion,
    isLocked,
    isSubmitting,
  } = navigation;
  const errorId = error ? `${field.id}-error` : undefined;
  const required = isRequired(field);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLocked) onSubmit();
  }

  return (
    <form className="flex min-h-160 flex-col" onSubmit={handleSubmit}>
      <div className="border-b border-white/15 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <div
            aria-label="Progression du questionnaire"
            aria-valuemax={progress.total}
            aria-valuemin={1}
            aria-valuenow={progress.current}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"
            role="progressbar"
          >
            <div
              className="h-full origin-left rounded-full bg-hpg-orchid transition-transform duration-200 motion-reduce:transition-none"
              style={{ transform: `scaleX(${progress.percent / 100})` }}
            />
          </div>
          <span
            aria-live="polite"
            className="hidden whitespace-nowrap text-xs text-white/45 sm:inline"
          >
            {SAVE_LABELS[saveState]}
          </span>
          <span className="whitespace-nowrap text-xs tabular-nums text-white/60">
            {progress.current} / {progress.total}
          </span>
        </div>
      </div>

      <div className="flex flex-1 items-center px-5 py-10 sm:px-10 sm:py-14">
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <m.div
              animate={{ opacity: 1, x: 0 }}
              className="mx-auto w-full max-w-3xl"
              exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              key={field.ref}
              transition={transition}
            >
              <h2
                className="min-w-0 scroll-mt-32 break-words text-2xl font-semibold leading-tight text-white outline-none sm:text-4xl"
                id={`${field.id}-title`}
                ref={headingRef}
                tabIndex={-1}
              >
                {cleanTypeformText(field.title)}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {field.description
                  ? cleanTypeformText(field.description)
                  : required
                    ? null
                    : "Réponse facultative"}
                {field.description && !required
                  ? " Réponse facultative."
                  : null}
              </p>

              <div className="mt-7">
                <FormQuestionInput
                  deck={deck}
                  disabled={isLocked || isSubmitting}
                  errorId={errorId}
                  field={field}
                  inputRef={inputRef}
                  onAnswer={onAnswer}
                  onChoice={onChoice}
                  onDeckChange={onDeckChange}
                  onDeckRemove={onDeckRemove}
                  onScale={onScale}
                  onTextKeyDown={onTextKeyDown}
                  value={value}
                />
              </div>

              <div className="mt-4 min-h-6">
                {error ? (
                  <div
                    className="flex items-start gap-2 text-sm leading-6 text-red-300"
                    id={errorId}
                    role="alert"
                  >
                    <Alert02Icon className="mt-0.5 size-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <button
                  className={`${ghostButtonClass} disabled:invisible sm:justify-start`}
                  disabled={!canGoBack || isLocked || isSubmitting}
                  onClick={onBack}
                  type="button"
                >
                  <ArrowLeft01Icon className="size-4" />
                  Retour
                </button>

                <button
                  className={`${primaryButtonClass} disabled:cursor-wait disabled:opacity-60 sm:px-5`}
                  disabled={isLocked || isSubmitting}
                  type="submit"
                >
                  {isSubmitting
                    ? "Enregistrement…"
                    : isLastQuestion
                      ? "Envoyer mes réponses"
                      : hasCurrentAnswer || required
                        ? "Continuer"
                        : "Passer"}
                  {!isSubmitting ? (
                    <ArrowRight01Icon className="size-5" />
                  ) : null}
                </button>
              </div>
            </m.div>
          </AnimatePresence>
        </LazyMotion>
      </div>
    </form>
  );
}
