import immersionJson from "@/app/data/immersion-questionnaire-definition.json";
import onboardingJson from "@/app/data/onboarding-client-definition.json";

// Formulaires clients rattachés à Cockpit. Le lien porte un token
// `missionId.clientId`, les brouillons et les réponses vivent dans Cockpit.

export type ClientFormKind = "immersion" | "onboarding";

export const CLIENT_FORM_KINDS: ClientFormKind[] = ["immersion", "onboarding"];

export function isClientFormKind(value: unknown): value is ClientFormKind {
  return (
    typeof value === "string" && (CLIENT_FORM_KINDS as string[]).includes(value)
  );
}

export interface AddressValue {
  cp: string;
  ligne1: string;
  ligne2: string;
  pays: string;
  ville: string;
}

export const ADDRESS_KEYS: (keyof AddressValue)[] = [
  "ligne1",
  "ligne2",
  "cp",
  "ville",
  "pays",
];

export type AnswerValue = AddressValue | number | string;
export type FormAnswers = Record<string, AnswerValue>;

export interface FormChoice {
  id: string;
  label: string;
  ref: string;
}

export type FormFieldType =
  | "address"
  | "email"
  | "file_upload"
  | "long_text"
  | "multiple_choice"
  | "opinion_scale"
  | "phone_number"
  | "short_text";

export interface FormField {
  description?: string;
  id: string;
  properties?: {
    allow_multiple_selection?: boolean;
    choices?: FormChoice[];
    format?: "siret";
    start_at_one?: boolean;
    steps?: number;
  };
  ref: string;
  title: string;
  type: FormFieldType;
  validations?: {
    required?: boolean;
  };
}

export interface FormDefinition {
  estimated_minutes: number;
  fields: FormField[];
  id: string;
  kind: ClientFormKind;
  thank_you_screen: {
    button_text?: string;
    description: string;
    summary: string;
    title: string;
  };
  title: string;
  welcome_screen: {
    button_text: string;
    description: string;
    title: string;
  };
}

export interface WebhookAnswer {
  fieldId: string;
  fieldRef: string;
  label: string;
  question: string;
  type: string;
  value: AnswerValue;
}

export interface ServerDraft {
  answers: FormAnswers;
  currentRef: string | null;
  startedAt: string;
  submittedAt: string | null;
  updatedAt: string;
}

const definitions: Record<ClientFormKind, FormDefinition> = {
  immersion: {
    ...(immersionJson as unknown as Omit<FormDefinition, "kind">),
    kind: "immersion",
  },
  onboarding: {
    ...(onboardingJson as unknown as Omit<FormDefinition, "kind">),
    kind: "onboarding",
  },
};

export const IMMERSION_DECK_FIELD_REF = "3f669dfd-5694-4ec3-a023-6358eb4ee1c4";

export function getFormDefinition(kind: ClientFormKind): FormDefinition {
  return definitions[kind];
}

export function getSessionCookieName(kind: ClientFormKind): string {
  return `hg_${kind}_session`;
}

export function getStorageKey(kind: ClientFormKind): string {
  return `hypergrowth-${kind}-form-v1`;
}

export function cleanTypeformText(value: string): string {
  return value
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/\\?\*/g, "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function getFormField(
  definition: FormDefinition,
  ref: string,
): FormField | undefined {
  return definition.fields.find((field) => field.ref === ref);
}

export function getFormChoice(
  field: FormField,
  choiceRef: string,
): FormChoice | undefined {
  return field.properties?.choices?.find((choice) => choice.ref === choiceRef);
}

export function isRequired(field: FormField): boolean {
  return Boolean(field.validations?.required);
}

export function isAddressValue(value: unknown): value is AddressValue {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasAddressContent(value: AddressValue): boolean {
  return ADDRESS_KEYS.some((key) => value[key]?.trim().length > 0);
}

export function isAnswered(value: AnswerValue | undefined): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return true;
  if (isAddressValue(value)) return hasAddressContent(value);
  return false;
}

export function emptyAddress(): AddressValue {
  return { cp: "", ligne1: "", ligne2: "", pays: "France", ville: "" };
}

export function getFormProgress(
  definition: FormDefinition,
  currentRef: string,
) {
  const index = Math.max(
    0,
    definition.fields.findIndex((field) => field.ref === currentRef),
  );
  const total = definition.fields.length;

  return {
    current: index + 1,
    index,
    percent: ((index + 1) / total) * 100,
    total,
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?\d{8,15}$/;

// Message d'erreur affiché sous la question, null si la réponse passe.
export function validateAnswer(
  field: FormField,
  value: AnswerValue | undefined,
): string | null {
  const answered = isAnswered(value);

  if (!answered) {
    return isRequired(field)
      ? "Cette réponse est nécessaire pour continuer."
      : null;
  }

  if (field.type === "email" && typeof value === "string") {
    return EMAIL_RE.test(value.trim())
      ? null
      : "Cette adresse email ne semble pas valide.";
  }

  if (field.type === "phone_number" && typeof value === "string") {
    const digits = value.replace(/[\s.()-]/g, "");
    return PHONE_RE.test(digits) ? null : "Ce numéro ne semble pas valide.";
  }

  if (field.properties?.format === "siret" && typeof value === "string") {
    return /^\d{14}$/.test(value.replace(/\s/g, ""))
      ? null
      : "Un numéro de SIRET compte 14 chiffres.";
  }

  if (field.type === "address" && isAddressValue(value)) {
    const complete = ["ligne1", "cp", "ville", "pays"].every(
      (key) => value[key as keyof AddressValue]?.trim().length > 0,
    );
    return complete
      ? null
      : "Renseigne au moins l’adresse, le code postal, la ville et le pays.";
  }

  return null;
}

export function validateAnswers(
  definition: FormDefinition,
  answers: FormAnswers,
): { message: string; ref: string } | null {
  for (const field of definition.fields) {
    if (field.type === "file_upload") continue;
    const message = validateAnswer(field, answers[field.ref]);
    if (message) return { message, ref: field.ref };
  }
  return null;
}

function sanitizeText(value: unknown, max = 5_000): string | null {
  return typeof value === "string" ? value.trim().slice(0, max) : null;
}

export function sanitizeAnswers(
  definition: FormDefinition,
  input: unknown,
): FormAnswers {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};

  const sanitized: FormAnswers = {};

  for (const [ref, rawValue] of Object.entries(input)) {
    const field = getFormField(definition, ref);
    if (!field || field.type === "file_upload") continue;

    if (field.type === "opinion_scale") {
      const minimum = field.properties?.start_at_one ? 1 : 0;
      const steps = field.properties?.steps ?? 10;
      const maximum = field.properties?.start_at_one ? steps : steps - 1;
      if (
        typeof rawValue === "number" &&
        Number.isInteger(rawValue) &&
        rawValue >= minimum &&
        rawValue <= maximum
      ) {
        sanitized[ref] = rawValue;
      }
      continue;
    }

    if (field.type === "multiple_choice") {
      const allowedChoices = new Set(
        field.properties?.choices?.map((choice) => choice.ref) ?? [],
      );
      if (typeof rawValue === "string" && allowedChoices.has(rawValue)) {
        sanitized[ref] = rawValue;
      }
      continue;
    }

    if (field.type === "address") {
      if (!isAddressValue(rawValue)) continue;
      const address = emptyAddress();
      for (const key of ADDRESS_KEYS) {
        address[key] = sanitizeText(rawValue[key], 200) ?? "";
      }
      if (hasAddressContent(address)) sanitized[ref] = address;
      continue;
    }

    const text = sanitizeText(rawValue);
    if (text !== null) sanitized[ref] = text;
  }

  return sanitized;
}

export function countAnswers(
  definition: FormDefinition,
  answers: FormAnswers,
): number {
  return definition.fields.filter((field) => isAnswered(answers[field.ref]))
    .length;
}

export function formatAddress(value: AddressValue): string {
  return [
    value.ligne1,
    value.ligne2,
    [value.cp, value.ville].filter(Boolean).join(" "),
    value.pays,
  ]
    .map((line) => line?.trim())
    .filter(Boolean)
    .join(", ");
}

export function buildWebhookAnswers(
  definition: FormDefinition,
  answers: FormAnswers,
): WebhookAnswer[] {
  return definition.fields.flatMap((field) => {
    if (field.type === "file_upload") return [];

    const value = answers[field.ref];
    if (!isAnswered(value) || value === undefined) return [];

    const label =
      field.type === "multiple_choice"
        ? getFormChoice(field, String(value))?.label || String(value)
        : isAddressValue(value)
          ? formatAddress(value)
          : String(value);

    return [
      {
        fieldId: field.id,
        fieldRef: field.ref,
        label,
        question: cleanTypeformText(field.title),
        type: field.type,
        value,
      },
    ];
  });
}

export function isValidAccessToken(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const uuid =
    "[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}";

  return new RegExp(`^${uuid}\\.${uuid}$`, "i").test(value);
}

export function parseServerDraft(input: unknown): ServerDraft | null {
  if (!input || typeof input !== "object") return null;
  const draft = input as Partial<ServerDraft>;
  if (
    typeof draft.startedAt !== "string" ||
    typeof draft.updatedAt !== "string"
  )
    return null;
  return {
    answers:
      draft.answers && typeof draft.answers === "object"
        ? (draft.answers as FormAnswers)
        : {},
    currentRef: typeof draft.currentRef === "string" ? draft.currentRef : null,
    startedAt: draft.startedAt,
    submittedAt:
      typeof draft.submittedAt === "string" ? draft.submittedAt : null,
    updatedAt: draft.updatedAt,
  };
}
