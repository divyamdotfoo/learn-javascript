import { Answer, Category, LocalStore, Question } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LOCAL_STORAGE_KEY, supportedLanguages } from "../constants";
import { useSingleStore } from "@/store";

export const useLocalStorage = (allQuestions: Question[]) => {
  const { category, updateQuestions } = useSingleStore((s) => ({
    category: s.category,
    updateQuestions: s.updateQuestions,
  }));
  const pathname = usePathname().slice(1);

  useEffect(() => {
    if (!supportedLanguages.includes(pathname)) return;

    const resetLocalStore = () => {
      const initial: LocalStore = {
        [pathname]: {
          category: "all",
          questions: {},
          index: 0,
        },
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
      useSingleStore.setState({
        questions: {
          all: [...allQuestions],
          solved: [],
          unsolved: [...allQuestions],
        },
        category: "all",
        currentQuestion: [...allQuestions][0],
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

    if (localStore[pathname] && localStore[pathname].questions) {
      const category = localStore[pathname].category;
      updateQuestions(localStore[pathname].questions, category, [
        ...allQuestions,
      ]);
    } else {
      const updatedData: LocalStore = {
        ...localStore,
        [pathname]: {
          category: "all",
          questions: {},
          index: 0,
        },
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
      updateQuestions({}, "all", [...allQuestions]);
      // updateCategory("all");
    }
  }, [allQuestions, updateQuestions]);
};

export const updateLocalStorage = (
  action: "add-id" | "reset-path" | "change-category" | "update-index",
  pathname: string,
  payload: {
    id?: string;
    category?: Category;
    index?: number;
    response?: Answer;
  }
) => {
  if (!supportedLanguages.includes(pathname)) return;
  const z = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!z) return;
  const data: LocalStore = JSON.parse(z);
  if (!data) return;

  if (action === "reset-path") {
    const updatedData: LocalStore = {
      ...data,
      [pathname]: { category: "all", questions: {}, index: 0 },
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    return;
  }

  const current = data[pathname];
  if (!current) return;

  if (action === "add-id" && payload.id && payload.response) {
    const questions: LocalStore[string]["questions"] = {
      ...current.questions,
      [payload.id]: { id: payload.id, response: payload.response },
    };
    const updatedData: LocalStore = {
      ...data,
      [pathname]: { ...current, questions },
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
