import { Category, LocalStore, Question } from "@/types";
import { create } from "zustand";

// A big fat single store.

interface SingleStore {
  questions: {
    solved: Question[];
    unsolved: Question[];
    all: Question[];
  };
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  incrementIndex: () => void;
  decrementIndex: () => void;
  category: Category;
  updateCategory: (val: Category) => void;
  currentQuestion: Question | null;
  explanation: boolean;
  showExplanation: () => void;
  hideExplanation: () => void;
  updateQuestions: (
    solvedQs: LocalStore["string"]["questions"],
    allQuestions?: Question[]
  ) => void;
}
export const useSingleStore = create<SingleStore>((set, get) => ({
  questions: {
    solved: [],
    unsolved: [],
    all: [],
  },

  updateQuestions: (solvedQs, allQuestions) => {
    const all = allQuestions ?? get().questions.all;
    const solved = all
      .filter((q) => Object.keys(solvedQs).includes(q.id))
      .map((q) => ({ ...q, solved: { response: solvedQs[q.id].response } }));

    const unsolved = all.filter((q) => !solved.map((q) => q.id).includes(q.id));

    set({
      questions: {
        all,
        solved,
        unsolved,
      },
    });
  },

  currentIndex: 0,
  setCurrentIndex: (v) => set({ currentIndex: v }),
  incrementIndex: () => {
    const newIndex =
      (get().currentIndex + 1) % get().questions[get().category].length;
    set((s) => ({
      currentIndex: newIndex,
      currentQuestion: s.questions[s.category][newIndex],
    }));
  },
  decrementIndex: () => {
    const newIndex = get().currentIndex - 1 < 0 ? 0 : get().currentIndex - 1;
    set((s) => ({
      currentIndex: newIndex,
      currentQuestion: s.questions[s.category][newIndex],
    }));
  },
  category: "all",
  updateCategory: (val) => {
    set((s) => ({
      currentIndex: 0,
      category: val,
      currentQuestion: s.questions[val][0],
    }));
  },
  currentQuestion: null,
  explanation: false,
  showExplanation: () => set({ explanation: true }),
  hideExplanation: () => set({ explanation: false }),
}));
