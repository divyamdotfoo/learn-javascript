"use client";
import { Question } from "./question";
import { Question as QuestionType } from "@/types";
import { Decrement, Increment } from "./increment-decrement";
import { useEffect } from "react";
import { useSingleStore } from "@/store";
import { useLocalStorage } from "@/lib/use-localstorage";
import { FilterQuestions } from "./filter-questions";

export function Main({ allQuestions }: { allQuestions: QuestionType[] }) {
  // syncing zustand store with localstorage for each path
  useLocalStorage(allQuestions);

  const setIndex = useSingleStore((s) => s.setCurrentIndex);
  useEffect(() => {
    setIndex(0);
  }, [allQuestions]);

  return (
    <div className=" flex flex-col items-start gap-6 py-8 min-h-screen">
      <div className=" flex items-center justify-between w-full">
        <FilterQuestions allQuestionsLength={allQuestions.length} />
        <div className=" hidden sm:flex items-center gap-3">
          <Decrement />
          <Increment />
        </div>
      </div>
      <Question allQuestions={allQuestions} />
    </div>
  );
}
