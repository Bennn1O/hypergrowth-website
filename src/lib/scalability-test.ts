import definitionJson from "@/app/data/scalability-test-definition.json";

export type AnswerValue = string | number | string[] | boolean;
export type Answers = Record<string, AnswerValue>;
export type VariableValue = string | number;

export interface TypeformChoice {
  id: string;
  ref: string;
  label: string;
  attachment?: {
    href?: string;
    type?: string;
  };
}

export interface TypeformField {
  id: string;
  ref: string;
  title: string;
  type: string;
  properties?: {
    allow_multiple_selection?: boolean;
    button_text?: string;
    choices?: TypeformChoice[];
    description?: string;
    fields?: TypeformField[];
    labels?: {
      center?: string;
      left?: string;
      right?: string;
    };
    start_at_one?: boolean;
    steps?: number;
  };
  validations?: {
    required?: boolean;
  };
}

interface TypeformOperand {
  type: "choice" | "constant" | "field" | "outcome" | "variable";
  value: string | number;
}

interface TypeformCondition {
  op:
    | "always"
    | "and"
    | "equal"
    | "greater_equal_than"
    | "is"
    | "lower_equal_than"
    | "or";
  vars: Array<TypeformCondition | TypeformOperand>;
}

interface TypeformAction {
  action: "add" | "jump" | "set";
  condition: TypeformCondition;
  details: {
    target: TypeformOperand;
    to?: TypeformOperand;
    value?: TypeformOperand;
  };
}

interface TypeformLogic {
  ref: string;
  actions: TypeformAction[];
}

interface TypeformOutcomeChoice {
  id: string;
  ref: string;
  thankyou_screen_ref: string;
  title: string;
}

interface TypeformThankYouScreen {
  ref: string;
  title: string;
  properties: {
    button_text?: string;
    description?: string;
    redirect_url?: string;
  };
}

interface TypeformDefinition {
  fields: TypeformField[];
  id: string;
  logic: TypeformLogic[];
  outcome: {
    choices: TypeformOutcomeChoice[];
    variable: string;
  };
  thankyou_screens: TypeformThankYouScreen[];
  variables: Record<string, VariableValue>;
  welcome_screens: Array<{
    title: string;
    properties: {
      button_text?: string;
      description?: string;
    };
  }>;
}

export interface FormStep extends TypeformField {
  group?: {
    description?: string;
    ref: string;
    title: string;
  };
}

export interface ScalabilityResult {
  buttonText: string;
  description: string;
  outcomeId: string;
  outcomeRef: string;
  redirectUrl: string;
  score: number;
  thankYouScreenRef: string;
  title: string;
}

export interface ScalabilityWebhookAnswer {
  fieldId: string;
  fieldRef: string;
  label: string;
  question: string;
  type: string;
  value: AnswerValue;
}

const definition = definitionJson as unknown as TypeformDefinition;

const ANSWERABLE_TYPES = new Set([
  "dropdown",
  "email",
  "long_text",
  "multiple_choice",
  "opinion_scale",
  "phone_number",
  "picture_choice",
  "short_text",
  "website",
]);

export const SCALABILITY_FORM_ID = definition.id;
export const SCALABILITY_TEST_STORAGE_KEY = "hypergrowth-scalability-test-v1";

export const SCALABILITY_CONTACT_REFS = {
  annualRevenue: "5fd040ec-81c8-46eb-b7fd-72674f14dec5",
  company: "f815968e-027b-4142-8aee-6d4a1b98d8cf",
  email: "97a6226a-dec3-4af6-823e-d9541f8b3033",
  firstName: "a5213698-173e-47d4-8c01-7b3413042380",
  phone: "7629ff64-14d3-4164-a425-83cac232a07c",
} as const;

export const SCALABILITY_TEST_STEPS: FormStep[] = definition.fields.flatMap(
  (field) => {
    if (field.type !== "group" || !field.properties?.fields) {
      return [field];
    }

    return field.properties.fields.map((child) => ({
      ...child,
      group: {
        description: field.properties?.description,
        ref: field.ref,
        title: field.title,
      },
    }));
  },
);

const fieldByRef = new Map(
  SCALABILITY_TEST_STEPS.map((field) => [field.ref, field]),
);
const fieldIndexByRef = new Map(
  SCALABILITY_TEST_STEPS.map((field, index) => [field.ref, index]),
);

export const SCALABILITY_WELCOME = definition.welcome_screens[0];

export function cleanTypeformText(value: string): string {
  return value
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/\\?\*/g, "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function isAnswerableField(field: TypeformField): boolean {
  return ANSWERABLE_TYPES.has(field.type);
}

export function isAnswered(value: AnswerValue | undefined): boolean {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim().length > 0;
  return typeof value === "number" || typeof value === "boolean";
}

export function getFieldByRef(ref: string): FormStep | undefined {
  return fieldByRef.get(ref);
}

export function getChoiceByRef(
  field: TypeformField,
  choiceRef: string,
): TypeformChoice | undefined {
  return field.properties?.choices?.find((choice) => choice.ref === choiceRef);
}

function isCondition(
  value: TypeformCondition | TypeformOperand,
): value is TypeformCondition {
  return "op" in value;
}

function resolveOperand(
  operand: TypeformOperand,
  answers: Answers,
  variables: Record<string, VariableValue>,
): AnswerValue | VariableValue | undefined {
  if (operand.type === "field") return answers[String(operand.value)];
  if (operand.type === "variable") return variables[String(operand.value)];
  return operand.value;
}

export function evaluateCondition(
  condition: TypeformCondition,
  answers: Answers,
  variables: Record<string, VariableValue>,
): boolean {
  if (condition.op === "always") return true;

  if (condition.op === "and" || condition.op === "or") {
    const results = condition.vars.map((part) =>
      isCondition(part)
        ? evaluateCondition(part, answers, variables)
        : Boolean(resolveOperand(part, answers, variables)),
    );
    return condition.op === "and"
      ? results.every(Boolean)
      : results.some(Boolean);
  }

  const [leftOperand, rightOperand] = condition.vars;
  if (
    !leftOperand ||
    !rightOperand ||
    isCondition(leftOperand) ||
    isCondition(rightOperand)
  )
    return false;

  const left = resolveOperand(leftOperand, answers, variables);
  const right = resolveOperand(rightOperand, answers, variables);

  if (condition.op === "is") {
    return Array.isArray(left) ? left.includes(String(right)) : left === right;
  }

  if (condition.op === "equal") return left === right;

  if (typeof left !== "number" || typeof right !== "number") return false;
  if (condition.op === "greater_equal_than") return left >= right;
  if (condition.op === "lower_equal_than") return left <= right;
  return false;
}

export function calculateVariables(
  answers: Answers,
): Record<string, VariableValue> {
  const variables = { ...definition.variables };

  for (const rule of definition.logic) {
    for (const action of rule.actions) {
      if (
        action.action === "jump" ||
        !evaluateCondition(action.condition, answers, variables)
      )
        continue;

      const target = String(action.details.target.value);
      const valueOperand = action.details.value;
      if (!valueOperand) continue;
      const value = resolveOperand(valueOperand, answers, variables);

      if (action.action === "add" && typeof value === "number") {
        const currentValue = variables[target];
        variables[target] =
          (typeof currentValue === "number" ? currentValue : 0) + value;
      }

      if (
        action.action === "set" &&
        (typeof value === "number" || typeof value === "string")
      ) {
        variables[target] = value;
      }
    }
  }

  return variables;
}

export function getScalabilityResult(answers: Answers): ScalabilityResult {
  const variables = calculateVariables(answers);
  const score = typeof variables.score === "number" ? variables.score : 0;
  const outcomeRef = String(variables[definition.outcome.variable]);
  const outcome =
    definition.outcome.choices.find((choice) => choice.ref === outcomeRef) ??
    definition.outcome.choices[0];
  const thankYouScreen = definition.thankyou_screens.find(
    (screen) => screen.ref === outcome.thankyou_screen_ref,
  );

  return {
    buttonText: cleanTypeformText(
      thankYouScreen?.properties.button_text || "Voir mon plan d’action",
    ),
    description: cleanTypeformText(
      thankYouScreen?.properties.description || "",
    ),
    outcomeId: outcome.id,
    outcomeRef: outcome.ref,
    redirectUrl: thankYouScreen?.properties.redirect_url || "/contact",
    score,
    thankYouScreenRef: outcome.thankyou_screen_ref,
    title: cleanTypeformText(outcome.title),
  };
}

export type NextStep =
  | { ref: string; type: "field" }
  | { type: "outcome" }
  | null;

export function getNextStep(currentRef: string, answers: Answers): NextStep {
  const variables = calculateVariables(answers);
  const rule = definition.logic.find((item) => item.ref === currentRef);

  if (rule) {
    for (const action of rule.actions) {
      if (action.action !== "jump" || !action.details.to) continue;
      if (!evaluateCondition(action.condition, answers, variables)) continue;

      if (action.details.to.type === "field") {
        return { ref: String(action.details.to.value), type: "field" };
      }
      return { type: "outcome" };
    }
  }

  const index = fieldIndexByRef.get(currentRef);
  if (index === undefined) return null;
  const nextField = SCALABILITY_TEST_STEPS[index + 1];
  return nextField
    ? { ref: nextField.ref, type: "field" }
    : { type: "outcome" };
}

export function getProjectedPath(answers: Answers): FormStep[] {
  const path: FormStep[] = [];
  const visited = new Set<string>();
  let current = SCALABILITY_TEST_STEPS[0];

  while (current && !visited.has(current.ref)) {
    visited.add(current.ref);
    path.push(current);

    const canApplyLogic =
      current.type === "statement" || isAnswered(answers[current.ref]);
    const next = canApplyLogic ? getNextStep(current.ref, answers) : null;

    if (next?.type === "outcome") break;
    if (next?.type === "field") {
      const nextField = fieldByRef.get(next.ref);
      if (!nextField) break;
      current = nextField;
      continue;
    }

    const index = fieldIndexByRef.get(current.ref);
    if (index === undefined || !SCALABILITY_TEST_STEPS[index + 1]) break;
    current = SCALABILITY_TEST_STEPS[index + 1];
  }

  return path;
}

export function getProgress(
  currentRef: string,
  answers: Answers,
): { current: number; percent: number; total: number } {
  const projectedPath = getProjectedPath(answers);
  const answerablePath = projectedPath.filter(isAnswerableField);
  const currentIndex = answerablePath.findIndex(
    (field) => field.ref === currentRef,
  );
  const stepIndex = projectedPath.findIndex(
    (field) => field.ref === currentRef,
  );
  const answeredBefore = projectedPath
    .slice(0, Math.max(0, stepIndex + 1))
    .filter(isAnswerableField).length;
  const current = Math.max(
    1,
    currentIndex >= 0 ? currentIndex + 1 : answeredBefore,
  );
  const total = Math.max(1, answerablePath.length);
  return {
    current,
    percent: Math.min(100, Math.round((current / total) * 100)),
    total,
  };
}

export function validateField(
  field: TypeformField,
  value: AnswerValue | undefined,
): string | null {
  if (field.validations?.required && !isAnswered(value))
    return "Cette réponse est requise.";
  if (!isAnswered(value)) return null;

  if (
    field.type === "email" &&
    typeof value === "string" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  ) {
    return "Renseigne une adresse e-mail valide.";
  }

  if (
    field.type === "phone_number" &&
    typeof value === "string" &&
    value.replace(/\D/g, "").length < 8
  ) {
    return "Renseigne un numéro de téléphone valide.";
  }

  return null;
}

export function validateSubmission(
  answers: Answers,
): Array<{ field: FormStep; message: string }> {
  return getProjectedPath(answers)
    .map((field) => ({
      field,
      message: validateField(field, answers[field.ref]),
    }))
    .filter((item): item is { field: FormStep; message: string } =>
      Boolean(item.message),
    );
}

export function sanitizeAnswers(input: unknown): Answers {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};

  const sanitized: Answers = {};
  for (const [ref, rawValue] of Object.entries(input)) {
    const field = fieldByRef.get(ref);
    if (!field || !isAnswerableField(field)) continue;

    if (field.type === "opinion_scale" && typeof rawValue === "number") {
      const steps = field.properties?.steps ?? 10;
      const minimum = field.properties?.start_at_one ? 1 : 0;
      const maximum = field.properties?.start_at_one ? steps : steps - 1;
      if (
        Number.isInteger(rawValue) &&
        rawValue >= minimum &&
        rawValue <= maximum
      )
        sanitized[ref] = rawValue;
      continue;
    }

    if (
      field.type === "multiple_choice" ||
      field.type === "picture_choice" ||
      field.type === "dropdown"
    ) {
      const allowed = new Set(
        field.properties?.choices?.map((choice) => choice.ref) ?? [],
      );
      if (Array.isArray(rawValue)) {
        const choices = rawValue.filter(
          (value): value is string =>
            typeof value === "string" && allowed.has(value),
        );
        if (choices.length)
          sanitized[ref] = field.properties?.allow_multiple_selection
            ? choices
            : choices[0];
      } else if (typeof rawValue === "string" && allowed.has(rawValue)) {
        sanitized[ref] = rawValue;
      }
      continue;
    }

    if (typeof rawValue === "string")
      sanitized[ref] = rawValue.trim().slice(0, 5000);
    if (typeof rawValue === "boolean") sanitized[ref] = rawValue;
  }

  return sanitized;
}

export function buildWebhookAnswers(
  answers: Answers,
): ScalabilityWebhookAnswer[] {
  return getProjectedPath(answers).flatMap((field) => {
    const value = answers[field.ref];
    if (!isAnswerableField(field) || !isAnswered(value)) return [];

    const values = Array.isArray(value) ? value : [value];
    const choiceLabels = values
      .map((item) => getChoiceByRef(field, String(item))?.label)
      .filter((label): label is string => Boolean(label));

    return [
      {
        fieldId: field.id,
        fieldRef: field.ref,
        label: choiceLabels.length ? choiceLabels.join(", ") : String(value),
        question: cleanTypeformText(field.title),
        type: field.type,
        value,
      },
    ];
  });
}
