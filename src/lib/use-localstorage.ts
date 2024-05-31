import { Category, LocalStore, Question } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { supportedLanguages } from "./constants";
import { useSingleStore } from "@/store";

const LOCAL_STORAGE_KEY = "learn-javascript";

export const useLocalStorage = (allQuestions: Question[]) => {
  const { category, currentIndex } = useSingleStore((s) => ({
    category: s.category,
    currentIndex: s.currentIndex,
  }));
  const pathname = usePathname().slice(1);

  useEffect(() => {
    if (!supportedLanguages.includes(pathname)) return;

    const resetLocalStore = () => {
      const initial: LocalStore = {
        [pathname]: {
          category: "all",
          ids: [],
          index: 0,
        },
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));

      useSingleStore.setState({
        questions: {
          all: allQuestions,
          solved: [],
          unsolved: allQuestions,
        },
        currentQuestion: allQuestions[0],
      });
    };

    const isLocallyStored = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!isLocallyStored) {
      resetLocalStore();
      return;
    }

    const localStore = JSON.parse(isLocallyStored) as LocalStore;

    if (!localStore) {
      resetLocalStore();
      return;
    }

    if (localStore[pathname] && Array.isArray(localStore[pathname].ids)) {
      const solved = allQuestions.filter((q) =>
        localStore[pathname].ids.includes(q.id)
      );
      const unsolved = allQuestions.filter(
        (q) => !localStore[pathname].ids.includes(q.id)
      );
      const category = localStore[pathname].category;
      const currentQuestion =
        category === "all"
          ? allQuestions[0]
          : category === "solved"
          ? solved[0]
          : unsolved[0];
      useSingleStore.setState({
        questions: {
          all: allQuestions,
          solved,
          unsolved,
        },
        currentQuestion,
        category,
      });
    } else {
      const updatedData: LocalStore = {
        ...localStore,
        [pathname]: {
          category: "all",
          ids: [],
          index: 0,
        },
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));

      useSingleStore.setState({
        questions: {
          all: allQuestions,
          solved: [],
          unsolved: allQuestions,
        },
        currentQuestion: allQuestions[0],
      });
    }
  }, [allQuestions]);
};

export const updateLocalStorage = (
  action: "add-id" | "reset-path" | "change-category" | "update-index",
  pathname: string,
  payload: { id?: string; category?: Category; index?: number }
) => {
  if (!supportedLanguages.includes(pathname)) return;
  const z = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!z) return;
  const data: LocalStore = JSON.parse(z);
  if (!data) return;

  if (action === "reset-path") {
    const updatedData: LocalStore = {
      ...data,
      [pathname]: { category: "all", ids: [], index: 0 },
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    return;
  }

  const current = data[pathname];
  if (!current) return;

  if (action === "add-id" && payload.id) {
    const ids = Array.from(new Set([...current.ids, payload.id]));
    const updatedData: LocalStore = {
      ...data,
      [pathname]: { ...current, ids },
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    return;
  }

  if (action === "change-category" && payload.category) {
    const updatedData: LocalStore = {
      ...data,
      [pathname]: { ...current, category: payload.category },
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    return;
  }

  if (action === "update-index" && payload.index) {
    const updatedData: LocalStore = {
      ...data,
      [pathname]: { ...current, index: payload.index },
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    return;
  }
};
