"use client";
import { Question } from "./question";
import { Question as QuestionType } from "@/types";
import { Decrement, Increment } from "./increment-decrement";
import { useEffect } from "react";
import { useSingleStore } from "@/store";

export function Main({ allQuestions }: { allQuestions: QuestionType[] }) {
  const setIndex = useSingleStore((s) => s.setCurrentIndex);
  useEffect(() => {
    setIndex(0);
  }, [allQuestions]);
  console.log("render main component");

  return (
    <div>
      <Question allQuestions={allQuestions} />
      <div className=" flex items-center gap-3 pt-4">
        <Decrement />
        <Increment />
      </div>
    </div>
  );
}
