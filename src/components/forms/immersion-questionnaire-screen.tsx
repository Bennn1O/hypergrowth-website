import {
  Alert02Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  Shield01Icon,
} from "hugeicons-react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import type { ChangeEvent, FormEvent, KeyboardEvent, RefObject } from "react";

import { ImmersionQuestionInput } from "@/components/forms/immersion-questionnaire-field";
import {
  cleanTypeformText,
  IMMERSION_THANK_YOU,
  IMMERSION_WELCOME,
} from "@/lib/immersion-questionnaire";
import type {
  ImmersionAnswerValue,
  ImmersionField,
} from "@/lib/immersion-questionnaire";

interface ImmersionWelcomeProps {
  hasValidAccess: boolean;
  onStart: () => void;
}

interface ImmersionSuccessProps {
  reduceMotion: boolean | null;
}

interface ImmersionQuestionScreenProps {
  deck: File | null;
  error: string;
  field: ImmersionField;
  headingRef: RefObject<HTMLHeadingElement | null>;
  inputRef: (node: HTMLInputElement | HTMLTextAreaElement | null) => void;
  navigation: {
    hasCurrentAnswer: boolean;
    historyLength: number;
    isLastQuestion: boolean;
    isLocked: boolean;
    isSubmitting: boolean;
  };
  onAnswer: (value: ImmersionAnswerValue) => void;
  onBack: () => void;
  onChoice: (choiceRef: string) => void;
  onDeckChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDeckRemove: () => void;
  onScale: (value: number) => void;
  onSubmit: () => void;
  onTextKeyDown: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  progress: {
    current: number;
    percent: number;
    total: number;
  };
  reduceMotion: boolean | null;
  value?: ImmersionAnswerValue;
}

const transition = {
  duration: 0.22,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export function ImmersionWelcome({
  hasValidAccess,
  onStart,
}: ImmersionWelcomeProps) {
  return (
    <div className="flex min-h-160 items-center justify-center px-5 py-14 sm:px-10">
      <div className="mx-auto flex w-full min-w-0 max-w-2xl flex-col items-center text-center">
        <Shield01Icon className="mb-6 size-9 text-hpg-orchid" />
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          {cleanTypeformText(IMMERSION_WELCOME.title)}
        </h2>
        <p className="mt-5 w-full max-w-xl whitespace-pre-line break-words text-sm leading-7 text-hpg-silver sm:text-base">
          {cleanTypeformText(IMMERSION_WELCOME.description)}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/60">
          <span>15 questions</span>
          <span>Environ 15 minutes</span>
          <span>Progression enregistrée</span>
        </div>

        {!hasValidAccess ? (
          <div
            className="mt-7 flex max-w-lg items-start gap-2 rounded-xl border border-red-300/40 bg-red-300/10 p-4 text-left text-sm leading-6 text-red-200"
            role="alert"
          >
            <Alert02Icon className="mt-0.5 size-5 shrink-0" />
            <span>
              Ce lien est incomplet. Demande un nouveau lien à l’équipe
              HyperGrowth.
            </span>
          </div>
        ) : null}

        <button
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-hpg-violet-border bg-hpg-violet-btn px-4 text-center font-medium text-white transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto sm:px-6"
          disabled={!hasValidAccess}
          onClick={onStart}
          type="button"
        >
          {cleanTypeformText(IMMERSION_WELCOME.button_text)}
          <ArrowRight01Icon className="size-5" />
        </button>
      </div>
    </div>
  );
}

export function ImmersionSuccess({ reduceMotion }: ImmersionSuccessProps) {
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
            {cleanTypeformText(IMMERSION_THANK_YOU.title)}
          </h2>
          <p className="mt-4 text-sm leading-7 text-hpg-silver sm:text-base">
            Tes réponses ont bien été enregistrées. Elles aideront l’équipe à
            préparer les deux jours d’immersion.
          </p>
          <p className="mt-2 text-sm leading-7 text-white/60">
            {cleanTypeformText(IMMERSION_THANK_YOU.description)}
          </p>
        </m.div>
      </LazyMotion>
    </div>
  );
}

export function ImmersionQuestionScreen({
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
  value,
}: ImmersionQuestionScreenProps) {
  const {
    hasCurrentAnswer,
    historyLength,
    isLastQuestion,
    isLocked,
    isSubmitting,
  } = navigation;
  const errorId = error ? `${field.id}-error` : undefined;

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
                Réponse facultative
              </p>

              <div className="mt-7">
                <ImmersionQuestionInput
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
                  className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-2 text-sm text-white/65 transition-colors hover:text-white active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid disabled:invisible disabled:cursor-not-allowed sm:justify-start"
                  disabled={!historyLength || isLocked || isSubmitting}
                  onClick={onBack}
                  type="button"
                >
                  <ArrowLeft01Icon className="size-4" />
                  Retour
                </button>

                <button
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-hpg-violet-border bg-hpg-violet-btn px-4 text-center text-sm font-medium text-white transition-colors hover:border-hpg-orchid hover:bg-hpg-violet-dark active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid disabled:cursor-wait disabled:opacity-60 sm:px-5"
                  disabled={isLocked || isSubmitting}
                  type="submit"
                >
                  {isSubmitting
                    ? "Enregistrement…"
                    : isLastQuestion
                      ? "Envoyer mes réponses"
                      : hasCurrentAnswer
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
