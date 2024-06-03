import { Answer, Category, LocalStore, Question } from "@/types";
import { create } from "zustand";

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
    category: Category,
    allQuestions?: Question[]
  ) => void;
  addSolvedQuestion: (id: string, response: Answer) => void;
  questionAnimationDirection: "left" | "right";
}
export const useSingleStore = create<SingleStore>((set, get) => ({
  questionAnimationDirection: "right",
  questions: {
    solved: [],
    unsolved: [],
    all: [],
  },

  updateQuestions: (solvedQs, category, allQuestions) => {
    const all = allQuestions ?? get().questions.all;
    const solved = all
      .filter((q) => Object.keys(solvedQs).includes(q.id))
      .map((q) => ({ ...q, solved: { response: solvedQs[q.id].response } }));

    const unsolved = all.filter((q) => !solved.map((q) => q.id).includes(q.id));
    const questions = { all, solved, unsolved };
    set({
      questions,
      currentQuestion: questions[category][0],
      currentIndex: 0,
      category,
    });
  },

  addSolvedQuestion: (id, response) => {
    const all = get().questions.all;
    const q = all.find((q) => q.id === id);
    if (!q) return;
    const solved: Question[] = Object.values(
      [...get().questions.solved, { ...q, solved: { response } }].reduce(
        (acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        },
        {} as Record<string, Question>
      )
    );
    const unsolved = all.filter((q) => !solved.map((s) => s.id).includes(q.id));
    set({
      questions: { all, solved, unsolved },
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
      questionAnimationDirection: "left",
    }));
  },
  decrementIndex: () => {
    const newIndex = get().currentIndex - 1 < 0 ? 0 : get().currentIndex - 1;
    set((s) => ({
      currentIndex: newIndex,
      currentQuestion: s.questions[s.category][newIndex],
      questionAnimationDirection: "right",
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
