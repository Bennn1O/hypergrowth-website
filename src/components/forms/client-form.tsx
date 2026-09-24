"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

import type { TextElement } from "@/components/forms/client-form-field";
import {
  FormAlreadySubmitted,
  FormLinkError,
  FormQuestionScreen,
  FormSuccess,
  FormWelcome,
} from "@/components/forms/client-form-screen";
import {
  countAnswers,
  getFormDefinition,
  getFormProgress,
  getStorageKey,
  isAnswered,
  parseServerDraft,
  sanitizeAnswers,
  validateAnswer,
  type AnswerValue,
  type ClientFormKind,
  type FormAnswers,
} from "@/lib/client-forms";

// Moteur commun aux formulaires clients. Le brouillon vit dans Cockpit
// (source de vérité) et en copie locale dans le navigateur : quitter la page,
// changer d'appareil ou rouvrir le lien reprend là où on s'était arrêté.

type Phase =
  "loading" | "question" | "submitted" | "submitting" | "success" | "welcome";

type SaveState = "error" | "idle" | "saved" | "saving";

interface ClientFormProps {
  kind: ClientFormKind;
  successHref?: string;
}

interface LocalDraft {
  answers: FormAnswers;
  currentRef: string;
}

const MAX_DECK_SIZE = 10 * 1024 * 1024;
const SAVE_DEBOUNCE_MS = 800;
const SUBMIT_ERROR =
  "Tes réponses n’ont pas pu être envoyées. Réessaie dans un instant.";

function readLocalDraft(key: string): LocalDraft | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as LocalDraft) : null;
  } catch {
    return null;
  }
}

function writeLocalDraft(key: string, draft: LocalDraft) {
  try {
    window.localStorage.setItem(key, JSON.stringify(draft));
  } catch {
    // Le stockage local est une aide, jamais un prérequis.
  }
}

function clearLocalDraft(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Idem.
  }
}

export function ClientForm({ kind, successHref }: ClientFormProps) {
  const definition = getFormDefinition(kind);
  const storageKey = getStorageKey(kind);
  const fields = definition.fields;

  const [answers, setAnswers] = useState<FormAnswers>({});
  const [index, setIndex] = useState(0);
  const [deck, setDeck] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [isNavigationLocked, setIsNavigationLocked] = useState(false);
  const [phase, setPhase] = useState<Phase>("loading");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const textFieldRef = useRef<TextElement | null>(null);
  const selectionTimerRef = useRef<number | null>(null);
  const saveTimerRef = useRef<number | null>(null);
  const latestRef = useRef<LocalDraft>({
    answers: {},
    currentRef: fields[0].ref,
  });
  const savedSnapshotRef = useRef("");
  const reduceMotion = useReducedMotion();

  const field = fields[index] ?? fields[0];
  const value = answers[field.ref];
  const progress = getFormProgress(definition, field.ref);
  const isLastQuestion = index === fields.length - 1;
  const hasCurrentAnswer =
    field.type === "file_upload" ? Boolean(deck) : isAnswered(value);

  useEffect(() => {
    latestRef.current = { answers, currentRef: field.ref };
  }, [answers, field.ref]);

  async function persist(draft: LocalDraft, keepalive = false) {
    const snapshot = JSON.stringify(draft);
    if (snapshot === savedSnapshotRef.current) return;

    writeLocalDraft(storageKey, draft);
    setSaveState("saving");
    try {
      const response = await fetch(`/api/forms/${kind}/draft`, {
        body: snapshot,
        headers: { "Content-Type": "application/json" },
        keepalive,
        method: "PUT",
      });
      if (response.status === 409) {
        const data = (await response.json()) as { submittedAt?: string };
        setSubmittedAt(data.submittedAt ?? null);
        setPhase("submitted");
        return;
      }
      const data = (await response.json()) as { saved?: boolean };
      if (response.ok && data.saved) {
        savedSnapshotRef.current = snapshot;
        setSaveState("saved");
      } else {
        setSaveState("error");
      }
    } catch {
      setSaveState("error");
    }
  }

  // Les effets passent par ce ref pour ne pas dépendre d'une fonction
  // recréée à chaque rendu.
  const persistRef = useRef(persist);
  useEffect(() => {
    persistRef.current = persist;
  });

  // Chargement initial : brouillon Cockpit d'abord, copie locale en secours.
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      let remote: ReturnType<typeof parseServerDraft> = null;
      try {
        const response = await fetch(`/api/forms/${kind}/draft`, {
          signal: controller.signal,
        });
        if (response.status === 404 || response.status === 401) {
          const data = (await response.json()) as { error?: string };
          setLinkError(
            data.error ||
              "Ce lien n’est plus valide. Demande un nouveau lien à l’équipe HyperGrowth.",
          );
          return;
        }
        if (response.ok) {
          const data = (await response.json()) as { draft?: unknown };
          remote = parseServerDraft(data.draft);
        }
      } catch (caught) {
        if (caught instanceof Error && caught.name === "AbortError") return;
      }
      if (controller.signal.aborted) return;

      if (remote?.submittedAt) {
        setSubmittedAt(remote.submittedAt);
        setPhase("submitted");
        return;
      }

      const local = readLocalDraft(storageKey);
      const source =
        remote && Object.keys(remote.answers).length > 0
          ? remote
          : remote && !local
            ? remote
            : local;
      if (source) {
        const restored = sanitizeAnswers(definition, source.answers);
        const restoredIndex = Math.max(
          0,
          fields.findIndex((item) => item.ref === source.currentRef),
        );
        setAnswers(restored);
        setIndex(restoredIndex);
        savedSnapshotRef.current = remote
          ? JSON.stringify({
              answers: restored,
              currentRef: fields[restoredIndex].ref,
            })
          : "";
      }
      setPhase("welcome");
    }

    void load();
    return () => controller.abort();
  }, [definition, fields, kind, storageKey]);

  // Sauvegarde différée après chaque frappe.
  useEffect(() => {
    if (phase !== "question") return;
    if (saveTimerRef.current !== null)
      window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => {
      saveTimerRef.current = null;
      void persistRef.current({ answers, currentRef: field.ref });
    }, SAVE_DEBOUNCE_MS);
    return () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, [answers, field.ref, phase]);

  // Sauvegarde immédiate quand l'onglet passe en arrière-plan ou se ferme.
  useEffect(() => {
    if (phase !== "question") return;
    const flush = () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
      void persistRef.current(latestRef.current, true);
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    const onPageHide = () => flush();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "question") return;

    const isTextField = [
      "address",
      "email",
      "long_text",
      "phone_number",
      "short_text",
    ].includes(field.type);
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

  function start() {
    setError("");
    setPhase("question");
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setDeck(null);
    setError("");
    clearLocalDraft(storageKey);
    setPhase("question");
  }

  function updateAnswer(nextValue: AnswerValue) {
    setAnswers((current) => ({ ...current, [field.ref]: nextValue }));
    setError("");
  }

  async function submit(nextAnswers: FormAnswers) {
    setError("");
    setPhase("submitting");
    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    try {
      const formData = new FormData();
      formData.set("payload", JSON.stringify({ answers: nextAnswers }));
      if (deck) formData.set("deck", deck);

      const response = await fetch(`/api/forms/${kind}/submit`, {
        body: formData,
        method: "POST",
      });
      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (response.status === 409) {
        clearLocalDraft(storageKey);
        setPhase("submitted");
        return;
      }
      if (!response.ok || !data.ok) {
        setError(data.error || SUBMIT_ERROR);
        setPhase("question");
        return;
      }

      clearLocalDraft(storageKey);
      setPhase("success");
    } catch {
      setError(
        "Tes réponses n’ont pas pu être envoyées. Vérifie ta connexion puis réessaie.",
      );
      setPhase("question");
    }
  }

  async function advance(nextAnswers = answers) {
    if (field.type !== "file_upload") {
      const message = validateAnswer(field, nextAnswers[field.ref]);
      if (message) {
        setError(message);
        return;
      }
    }

    if (isLastQuestion) {
      await submit(nextAnswers);
      return;
    }

    const nextField = fields[index + 1];
    setAnswers(nextAnswers);
    setIndex(index + 1);
    setError("");
    void persist({ answers: nextAnswers, currentRef: nextField.ref });
  }

  function goBack() {
    if (isNavigationLocked || index === 0) return;
    setIndex(index - 1);
    setError("");
    void persist({ answers, currentRef: fields[index - 1].ref });
  }

  function scheduleAdvance(nextAnswers: FormAnswers) {
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

  function handleInputKeyDown(event: KeyboardEvent<TextElement>) {
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

  if (linkError) return <FormLinkError message={linkError} />;

  if (phase === "loading") {
    return (
      <div
        aria-live="polite"
        className="flex min-h-160 items-center justify-center px-5 py-14 text-center text-sm text-hpg-silver"
      >
        Ouverture de ton questionnaire…
      </div>
    );
  }

  if (phase === "submitted") {
    return <FormAlreadySubmitted submittedAt={submittedAt} />;
  }

  if (phase === "welcome") {
    const answered = countAnswers(definition, answers);
    return (
      <FormWelcome
        definition={definition}
        onRestart={restart}
        onStart={start}
        resume={answered > 0 ? { answered, question: index + 1 } : null}
      />
    );
  }

  if (phase === "success") {
    return (
      <FormSuccess
        definition={definition}
        nextHref={successHref}
        reduceMotion={reduceMotion}
      />
    );
  }

  return (
    <FormQuestionScreen
      deck={deck}
      error={error}
      field={field}
      headingRef={headingRef}
      inputRef={(node) => {
        textFieldRef.current = node;
      }}
      navigation={{
        canGoBack: index > 0,
        hasCurrentAnswer,
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
      saveState={saveState}
      value={value}
    />
  );
}
