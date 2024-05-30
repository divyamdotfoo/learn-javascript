import { Question } from "@/types";
import { create } from "zustand";

// A big fat single store looks nice . lol

interface SingleStore {
  questions: {
    solved: Question[];
    unsolved: Question[];
  };
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  incrementIndex: () => void;
  decrementIndex: () => void;
  category: "all" | "solved" | "unsolved";
  setCategory: (val: "all" | "solved" | "unsolved") => void;
}

export const useSingleStore = create<SingleStore>((set) => ({
  questions: {
    solved: [],
    unsolved: [],
  },
  currentIndex: 0,
  setCurrentIndex: (v) => set({ currentIndex: v }),
  incrementIndex: () => set((s) => ({ currentIndex: s.currentIndex + 1 })),
  decrementIndex: () => set((s) => ({ currentIndex: s.currentIndex - 1 })),
  category: "all",
  setCategory: (val) => set({ category: val }),
}));
