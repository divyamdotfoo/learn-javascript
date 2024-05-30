import { useSingleStore } from "@/store";
import type { Question } from "@/types";

export function Question({ allQuestions }: { allQuestions: Question[] }) {
  console.log("render question component");
  const { index, category, questions } = useSingleStore((s) => ({
    index: s.currentIndex,
    category: s.category,
    questions: s.questions,
  }));

  if (category === "all") {
    return (
      <div className=" flex flex-col items-start gap-4">
        <p>
          <span className=" font-semibold px-2">{index}</span>
          {allQuestions[index].question}
        </p>
        <div className=" flex flex-col gap-2">
          {allQuestions[index].options.map((option) => (
            <p>{option.text}</p>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className=" flex flex-col items-start gap-4">
      <p>
        <span className=" font-semibold px-2">{index}</span>
        <p>{questions[category][index].question}</p>
      </p>
      <div className=" flex flex-col gap-2">
        {questions[category][index].options.map((option) => (
          <p>{option.text}</p>
        ))}
      </div>
    </div>
  );
}
