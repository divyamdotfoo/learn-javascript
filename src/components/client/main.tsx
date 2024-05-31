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
    return () => console.log("main component unmounted");
  }, [allQuestions]);
  console.log("render main component");

  return (
    <div className=" flex flex-col items-start px-8 gap-2">
      <FilterQuestions allQuestionsLength={allQuestions.length} />
      <div className=" flex items-center gap-3 pt-4 self-end">
        <Decrement />
        <Increment />
      </div>
      <Question allQuestions={allQuestions} />
    </div>
  );
}
