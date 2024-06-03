"use client";
import { Question } from "./question";
import { Question as QuestionType } from "@/types";
import { Decrement, Increment } from "./increment-decrement";
import { FilterQuestions } from "./filter-questions";
import { useTouch } from "@/lib/hooks/useTouch";
import { logTime } from "@/lib/utils";

export function Main({ allQuestions }: { allQuestions: QuestionType[] }) {
  // syncing zustand store with localstorage for each path
  useTouch();
  return (
    <div className=" flex flex-col items-start gap-6 py-8 min-h-screen max-w-5xl mx-auto">
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
