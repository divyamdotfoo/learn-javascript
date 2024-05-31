import { updateLocalStorage } from "@/lib/use-localstorage";
import { cn } from "@/lib/utils";
import { useSingleStore } from "@/store";
import type { Answer, Question } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Explanation } from "./explanation";

export function Question({ allQuestions }: { allQuestions: Question[] }) {
  const pathname = usePathname().slice(1);

  console.log("render question component");

  const { index, currentQuestion, hideExplanation, showExplanation } =
    useSingleStore((s) => ({
      index: s.currentIndex,
      currentQuestion: s.currentQuestion,
      hideExplanation: s.hideExplanation,
      showExplanation: s.showExplanation,
    }));

  const [correct, setCorrect] = useState<Answer | null>(null);
  const [incorrect, setIncorrect] = useState<Answer | null>(null);

  useEffect(() => {
    setCorrect(null);
    setIncorrect(null);
    hideExplanation();
  }, [allQuestions, currentQuestion]);

  if (!currentQuestion) return null;

  const handleClick = (choosen: Answer) => {
    const correctAns = currentQuestion.answer;
    if (choosen !== correctAns) {
      setIncorrect(choosen);
      // further
    }
    setCorrect(currentQuestion.answer);
    showExplanation();
    updateLocalStorage("add-id", pathname, { id: currentQuestion.id });
  };

  return (
    <div className=" flex flex-col items-start gap-4 border border-white w-full ">
      <p>
        <span className=" font-semibold px-2">{index}</span>
        {currentQuestion.question}
      </p>
      <div className=" flex flex-col gap-2">
        {currentQuestion.options.map((option) => (
          <button
            className={cn(
              " border border-white p-4",
              correct === option.value ? "bg-green-900" : "",
              incorrect === option.value ? "bg-red-900" : ""
            )}
            onClick={() => handleClick(option.value)}
          >
            {option.text}
          </button>
        ))}
      </div>
      <Explanation isOptionChosen={!!correct} />
    </div>
  );
}
