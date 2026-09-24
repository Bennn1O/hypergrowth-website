import {
  Attachment01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  File01Icon,
} from "hugeicons-react";
import type { ChangeEvent, KeyboardEvent } from "react";

import {
  ADDRESS_KEYS,
  emptyAddress,
  isAddressValue,
  type AddressValue,
  type AnswerValue,
  type FormChoice,
  type FormField,
} from "@/lib/client-forms";

export type TextElement = HTMLInputElement | HTMLTextAreaElement;

interface FormQuestionInputProps {
  deck: File | null;
  disabled: boolean;
  errorId?: string;
  field: FormField;
  inputRef: (node: TextElement | null) => void;
  onAnswer: (value: AnswerValue) => void;
  onChoice: (choiceRef: string) => void;
  onDeckChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDeckRemove: () => void;
  onScale: (value: number) => void;
  onTextKeyDown: (event: KeyboardEvent<TextElement>) => void;
  value?: AnswerValue;
}

const inputClass =
  "w-full rounded-xl border border-white/30 bg-white/5 px-4 text-base text-white outline-2 outline-offset-1 outline-transparent transition-colors placeholder:text-white/50 focus:border-hpg-orchid focus:outline-hpg-orchid disabled:cursor-wait disabled:opacity-60";

const PLACEHOLDERS: Record<string, string> = {
  "9cc9b347-d7a2-48fa-8769-4cd1dddd47f2": "Ex. 1,2 M€",
  email_facturation: "Ex. compta@entreprise.fr",
  siret: "Ex. 123 456 789 00012",
  telephone: "Ex. 06 12 34 56 78",
  tva_intra: "Ex. FR12345678901",
};

const ADDRESS_LABELS: Record<keyof AddressValue, string> = {
  cp: "Code postal",
  ligne1: "Adresse",
  ligne2: "Complément d’adresse",
  pays: "Pays",
  ville: "Ville",
};

function ChoiceLabel({ choice, index }: { choice: FormChoice; index: number }) {
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
}: Pick<
  FormQuestionInputProps,
  "disabled" | "errorId" | "field" | "onChoice" | "value"
>) {
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
}: Pick<
  FormQuestionInputProps,
  "disabled" | "errorId" | "field" | "onScale" | "value"
>) {
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
}: Pick<
  FormQuestionInputProps,
  "deck" | "disabled" | "errorId" | "field" | "onDeckChange" | "onDeckRemove"
>) {
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

function AddressInput({
  disabled,
  errorId,
  field,
  inputRef,
  onAnswer,
  onTextKeyDown,
  value,
}: Pick<
  FormQuestionInputProps,
  | "disabled"
  | "errorId"
  | "field"
  | "inputRef"
  | "onAnswer"
  | "onTextKeyDown"
  | "value"
>) {
  const address = isAddressValue(value) ? value : emptyAddress();

  function update(key: keyof AddressValue, next: string) {
    onAnswer({ ...address, [key]: next });
  }

  return (
    <fieldset
      aria-describedby={errorId}
      className="grid gap-3 sm:grid-cols-6"
      disabled={disabled}
    >
      <legend className="sr-only">{field.title}</legend>
      {ADDRESS_KEYS.map((key) => {
        const isCompact = key === "cp";
        return (
          <label
            className={`grid gap-1.5 ${
              isCompact
                ? "sm:col-span-2"
                : key === "ville"
                  ? "sm:col-span-4"
                  : "sm:col-span-6"
            }`}
            key={key}
          >
            <span className="text-xs text-white/60">{ADDRESS_LABELS[key]}</span>
            <input
              autoComplete={
                key === "ligne1"
                  ? "address-line1"
                  : key === "ligne2"
                    ? "address-line2"
                    : key === "cp"
                      ? "postal-code"
                      : key === "ville"
                        ? "address-level2"
                        : "country-name"
              }
              className={`${inputClass} min-h-12`}
              name={`${field.ref}_${key}`}
              onChange={(event) => update(key, event.target.value)}
              onKeyDown={onTextKeyDown}
              ref={key === "ligne1" ? inputRef : undefined}
              type="text"
              value={address[key]}
            />
          </label>
        );
      })}
    </fieldset>
  );
}

export function FormQuestionInput(props: FormQuestionInputProps) {
  const { field, value } = props;

  if (field.type === "multiple_choice") return <ChoiceInput {...props} />;
  if (field.type === "opinion_scale") return <ScaleInput {...props} />;
  if (field.type === "file_upload") return <DeckInput {...props} />;
  if (field.type === "address") return <AddressInput {...props} />;

  const { disabled, errorId, inputRef, onAnswer, onTextKeyDown } = props;
  const textValue = typeof value === "string" ? value : "";

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

  const isEmail = field.type === "email";
  const isPhone = field.type === "phone_number";
  const isSiret = field.properties?.format === "siret";

  return (
    <input
      aria-describedby={errorId}
      aria-invalid={Boolean(errorId)}
      aria-labelledby={`${field.id}-title`}
      autoComplete={
        isEmail
          ? "email"
          : isPhone
            ? "tel"
            : field.ref === "contact_nom"
              ? "name"
              : "off"
      }
      className={`${inputClass} min-h-14`}
      disabled={disabled}
      inputMode={
        isSiret ? "numeric" : isPhone ? "tel" : isEmail ? "email" : undefined
      }
      onChange={(event) => onAnswer(event.target.value)}
      onKeyDown={onTextKeyDown}
      placeholder={PLACEHOLDERS[field.ref] ?? "Ta réponse"}
      ref={inputRef}
      type={isEmail ? "email" : isPhone ? "tel" : "text"}
      value={textValue}
    />
  );
}
