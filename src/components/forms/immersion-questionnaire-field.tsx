import {
  Attachment01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  File01Icon,
} from "hugeicons-react";
import type { ChangeEvent, KeyboardEvent } from "react";

import type {
  ImmersionAnswerValue,
  ImmersionChoice,
  ImmersionField,
} from "@/lib/immersion-questionnaire";

interface ImmersionQuestionInputProps {
  deck: File | null;
  disabled: boolean;
  errorId?: string;
  field: ImmersionField;
  inputRef: (node: HTMLInputElement | HTMLTextAreaElement | null) => void;
  onAnswer: (value: ImmersionAnswerValue) => void;
  onChoice: (choiceRef: string) => void;
  onDeckChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDeckRemove: () => void;
  onScale: (value: number) => void;
  onTextKeyDown: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value?: ImmersionAnswerValue;
}

interface ChoiceInputProps {
  disabled: boolean;
  errorId?: string;
  field: ImmersionField;
  onChoice: ImmersionQuestionInputProps["onChoice"];
  value?: ImmersionAnswerValue;
}

interface ScaleInputProps {
  disabled: boolean;
  errorId?: string;
  field: ImmersionField;
  onScale: ImmersionQuestionInputProps["onScale"];
  value?: ImmersionAnswerValue;
}

interface DeckInputProps {
  deck: File | null;
  disabled: boolean;
  errorId?: string;
  field: ImmersionField;
  onDeckChange: ImmersionQuestionInputProps["onDeckChange"];
  onDeckRemove: ImmersionQuestionInputProps["onDeckRemove"];
}

function ChoiceLabel({
  choice,
  index,
}: {
  choice: ImmersionChoice;
  index: number;
}) {
  return (
    <>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white/5 text-xs text-white/70">
        {String.fromCharCode(65 + index)}
      </span>
      <span className="text-left text-sm leading-6 text-white/90 sm:text-base">
        {choice.label}
      </span>
    </>
  );
}

function ChoiceInput({
  disabled,
  errorId,
  field,
  onChoice,
  value,
}: ChoiceInputProps) {
  const choices = field.properties?.choices ?? [];
  const selectedRef = typeof value === "string" ? value : "";

  return (
    <fieldset
      aria-describedby={errorId}
      className="grid gap-2"
      disabled={disabled}
    >
      <legend className="sr-only">{field.title}</legend>
      {choices.map((choice, index) => {
        const isSelected = selectedRef === choice.ref;

        return (
          <label
            className={`flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-hpg-orchid active:translate-y-px ${
              isSelected
                ? "border-hpg-orchid bg-hpg-violet-dark"
                : "border-white/25 bg-white/5 hover:border-white/40 hover:bg-white/10"
            }`}
            key={choice.ref}
          >
            <input
              checked={isSelected}
              className="sr-only"
              name={field.ref}
              onChange={() => onChoice(choice.ref)}
              type="radio"
              value={choice.ref}
            />
            <ChoiceLabel choice={choice} index={index} />
            {isSelected ? (
              <CheckmarkCircle02Icon className="ml-auto size-5 shrink-0 text-hpg-orchid" />
            ) : null}
          </label>
        );
      })}
    </fieldset>
  );
}

function ScaleInput({
  disabled,
  errorId,
  field,
  onScale,
  value,
}: ScaleInputProps) {
  const steps = field.properties?.steps ?? 10;
  const minimum = field.properties?.start_at_one ? 1 : 0;
  const maximum = field.properties?.start_at_one ? steps : steps - 1;
  const scale = Array.from(
    { length: maximum - minimum + 1 },
    (_, index) => minimum + index,
  );

  return (
    <div className="space-y-3">
      <fieldset
        aria-describedby={errorId}
        className="grid grid-cols-5 gap-2 sm:grid-cols-10"
        disabled={disabled}
      >
        <legend className="sr-only">{field.title}</legend>
        {scale.map((number) => {
          const isSelected = value === number;

          return (
            <label
              className={`flex aspect-square min-h-12 cursor-pointer items-center justify-center rounded-xl border text-sm font-medium transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-hpg-orchid active:translate-y-px ${
                isSelected
                  ? "border-hpg-orchid bg-hpg-orchid text-hpg-ink"
                  : "border-white/25 bg-white/5 text-white/80 hover:border-white/40"
              }`}
              key={number}
            >
              <input
                checked={isSelected}
                className="sr-only"
                name={field.ref}
                onChange={() => onScale(number)}
                type="radio"
                value={number}
              />
              {number}
            </label>
          );
        })}
      </fieldset>
      <div className="flex justify-between text-xs text-white/60">
        <span>Peu urgent</span>
        <span>Très urgent</span>
      </div>
    </div>
  );
}

function formatFileSize(size: number): string {
  return `${(size / 1024 / 1024).toFixed(1).replace(".0", "")} Mo`;
}

function DeckInput({
  deck,
  disabled,
  errorId,
  field,
  onDeckChange,
  onDeckRemove,
}: DeckInputProps) {
  if (deck) {
    return (
      <div className="flex min-h-20 items-center gap-3 rounded-xl border border-hpg-orchid/50 bg-hpg-orchid/10 p-4">
        <File01Icon className="size-6 shrink-0 text-hpg-orchid" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{deck.name}</p>
          <p className="mt-1 text-xs text-white/65">
            {formatFileSize(deck.size)}
          </p>
        </div>
        <button
          aria-label="Retirer le deck"
          className="flex size-11 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hpg-orchid disabled:cursor-wait disabled:opacity-50"
          disabled={disabled}
          onClick={onDeckRemove}
          type="button"
        >
          <Cancel01Icon className="size-5" />
        </button>
      </div>
    );
  }

  return (
    <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/30 bg-white/5 px-5 py-7 text-center transition-colors hover:border-hpg-orchid/70 hover:bg-hpg-orchid/5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-hpg-orchid">
      <Attachment01Icon className="size-7 text-hpg-orchid" />
      <span className="mt-3 text-sm font-medium text-white">
        Choisir un fichier
      </span>
      <span className="mt-1 text-xs leading-5 text-white/60">
        PDF, PowerPoint ou Keynote, 10 Mo maximum
      </span>
      <input
        accept=".key,.pdf,.ppt,.pptx,application/pdf,application/vnd.apple.keynote,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        aria-describedby={errorId}
        aria-labelledby={`${field.id}-title`}
        className="sr-only"
        disabled={disabled}
        onChange={onDeckChange}
        type="file"
      />
    </label>
  );
}

export function ImmersionQuestionInput({
  deck,
  disabled,
  errorId,
  field,
  inputRef,
  onAnswer,
  onChoice,
  onDeckChange,
  onDeckRemove,
  onScale,
  onTextKeyDown,
  value,
}: ImmersionQuestionInputProps) {
  if (field.type === "multiple_choice") {
    return (
      <ChoiceInput
        disabled={disabled}
        errorId={errorId}
        field={field}
        onChoice={onChoice}
        value={value}
      />
    );
  }

  if (field.type === "opinion_scale") {
    return (
      <ScaleInput
        disabled={disabled}
        errorId={errorId}
        field={field}
        onScale={onScale}
        value={value}
      />
    );
  }

  if (field.type === "file_upload") {
    return (
      <DeckInput
        deck={deck}
        disabled={disabled}
        errorId={errorId}
        field={field}
        onDeckChange={onDeckChange}
        onDeckRemove={onDeckRemove}
      />
    );
  }

  const textValue = typeof value === "string" ? value : "";
  const inputClass =
    "w-full rounded-xl border border-white/30 bg-white/5 px-4 text-base text-white outline-2 outline-offset-1 outline-transparent transition-colors placeholder:text-white/50 focus:border-hpg-orchid focus:outline-hpg-orchid disabled:cursor-wait disabled:opacity-60";

  if (field.type === "long_text") {
    return (
      <textarea
        aria-describedby={errorId}
        aria-invalid={Boolean(errorId)}
        aria-labelledby={`${field.id}-title`}
        className={`${inputClass} min-h-40 resize-y py-4 leading-7`}
        disabled={disabled}
        onChange={(event) => onAnswer(event.target.value)}
        onKeyDown={onTextKeyDown}
        placeholder="Développe ta réponse ici…"
        ref={inputRef}
        value={textValue}
      />
    );
  }

  return (
    <input
      aria-describedby={errorId}
      aria-invalid={Boolean(errorId)}
      aria-labelledby={`${field.id}-title`}
      className={`${inputClass} min-h-14`}
      disabled={disabled}
      onChange={(event) => onAnswer(event.target.value)}
      onKeyDown={onTextKeyDown}
      placeholder={
        field.ref === "9cc9b347-d7a2-48fa-8769-4cd1dddd47f2"
          ? "Ex. 1,2 M€"
          : "Ta réponse"
      }
      ref={inputRef}
      type="text"
      value={textValue}
    />
  );
}
