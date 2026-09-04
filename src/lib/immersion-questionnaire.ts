import definitionJson from "@/app/data/immersion-questionnaire-definition.json";

export type ImmersionAnswerValue = string | number;
export type ImmersionAnswers = Record<string, ImmersionAnswerValue>;

export interface ImmersionChoice {
  id: string;
  label: string;
  ref: string;
}

export interface ImmersionField {
  id: string;
  properties?: {
    allow_multiple_selection?: boolean;
    choices?: ImmersionChoice[];
    start_at_one?: boolean;
    steps?: number;
  };
  ref: string;
  title: string;
  type:
    | "file_upload"
    | "long_text"
    | "multiple_choice"
    | "opinion_scale"
    | "short_text";
  validations?: {
    required?: boolean;
  };
}

interface ImmersionDefinition {
  fields: ImmersionField[];
  id: string;
  thank_you_screen: {
    description: string;
    title: string;
  };
  title: string;
  welcome_screen: {
    button_text: string;
    description: string;
    title: string;
  };
}

export interface ImmersionWebhookAnswer {
  fieldId: string;
  fieldRef: string;
  label: string;
  question: string;
  type: string;
  value: ImmersionAnswerValue;
}

const definition = definitionJson as unknown as ImmersionDefinition;
const fieldByRef = new Map(
  definition.fields.map((field) => [field.ref, field]),
);

export const IMMERSION_FORM_ID = definition.id;
export const IMMERSION_FORM_TITLE = definition.title;
export const IMMERSION_QUESTIONNAIRE_STEPS = definition.fields;
export const IMMERSION_WELCOME = definition.welcome_screen;
export const IMMERSION_THANK_YOU = definition.thank_you_screen;
export const IMMERSION_DECK_FIELD_REF = "3f669dfd-5694-4ec3-a023-6358eb4ee1c4";
export const IMMERSION_SESSION_COOKIE = "hg_immersion_session";
export const IMMERSION_STORAGE_KEY = "hypergrowth-immersion-questionnaire-v1";

export function cleanTypeformText(value: string): string {
  return value
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/\\?\*/g, "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function getImmersionField(ref: string): ImmersionField | undefined {
  return fieldByRef.get(ref);
}

export function getImmersionChoice(
  field: ImmersionField,
  choiceRef: string,
): ImmersionChoice | undefined {
  return field.properties?.choices?.find((choice) => choice.ref === choiceRef);
}

export function isImmersionAnswered(
  value: ImmersionAnswerValue | undefined,
): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  return typeof value === "number";
}

export function getImmersionProgress(currentRef: string) {
  const index = Math.max(
    0,
    IMMERSION_QUESTIONNAIRE_STEPS.findIndex(
      (field) => field.ref === currentRef,
    ),
  );
  const total = IMMERSION_QUESTIONNAIRE_STEPS.length;

  return {
    current: index + 1,
    percent: ((index + 1) / total) * 100,
    total,
  };
}

export function sanitizeImmersionAnswers(input: unknown): ImmersionAnswers {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};

  const sanitized: ImmersionAnswers = {};

  for (const [ref, rawValue] of Object.entries(input)) {
    const field = fieldByRef.get(ref);
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

    if (typeof rawValue === "string") {
      sanitized[ref] = rawValue.trim().slice(0, 5_000);
    }
  }

  return sanitized;
}

export function buildImmersionWebhookAnswers(
  answers: ImmersionAnswers,
): ImmersionWebhookAnswer[] {
  return IMMERSION_QUESTIONNAIRE_STEPS.flatMap((field) => {
    if (field.type === "file_upload") return [];

    const value = answers[field.ref];
    if (!isImmersionAnswered(value)) return [];

    return [
      {
        fieldId: field.id,
        fieldRef: field.ref,
        label:
          field.type === "multiple_choice"
            ? getImmersionChoice(field, String(value))?.label || String(value)
            : String(value),
        question: cleanTypeformText(field.title),
        type: field.type,
        value,
      },
    ];
  });
}

export function isValidImmersionAccessToken(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const uuid =
    "[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}";

  return new RegExp(`^${uuid}\\.${uuid}$`, "i").test(value);
}

export function getImmersionStorageKey(): string {
  return IMMERSION_STORAGE_KEY;
}
