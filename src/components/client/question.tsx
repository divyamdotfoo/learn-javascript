import { updateLocalStorage } from "@/lib/use-localstorage";
import { cn } from "@/lib/utils";
import { useSingleStore } from "@/store";
import type { Answer, Question } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Explanation } from "./explanation";
import { Editor } from "./editor";
import { motion, HTMLMotionProps } from "framer-motion";
import {} from "@radix-ui/react-icons";
export function Question({ allQuestions }: { allQuestions: Question[] }) {
  const pathname = usePathname().slice(1);

  const {
    index,
    currentQuestion,
    hideExplanation,
    showExplanation,
    updateQuestion,
  } = useSingleStore((s) => ({
    index: s.currentIndex,
    currentQuestion: s.currentQuestion,
    hideExplanation: s.hideExplanation,
    showExplanation: s.showExplanation,
    updateQuestion: s.updateQuestions,
  }));

  const [correct, setCorrect] = useState<Answer | null>();
  const [incorrect, setIncorrect] = useState<Answer | null>(null);

  useEffect(() => {
    if (!currentQuestion) return;
    if (currentQuestion.solved) {
      if (currentQuestion.solved.response === currentQuestion.answer) {
        setCorrect(currentQuestion.answer);
        setIncorrect(null);
      } else {
        setCorrect(currentQuestion.answer);
        setIncorrect(currentQuestion.solved.response);
      }
      showExplanation();
    } else {
      setCorrect(null);
      setIncorrect(null);
      hideExplanation();
    }
  }, [allQuestions, currentQuestion]);

  if (!currentQuestion)
    return (
      <div className=" w-full h-80 flex items-center justify-center"></div>
    );

  const handleClick = (choosen: Answer) => {
    const correctAns = currentQuestion.answer;
    if (choosen !== correctAns) {
      setIncorrect(choosen);
      // further
    }
    setCorrect(currentQuestion.answer);
    showExplanation();
    // updating client state
    updateQuestion(
      {
        [currentQuestion.id]: {
          id: currentQuestion.id,
          response: choosen,
        },
      },
      allQuestions
    );

    updateLocalStorage("add-id", pathname, {
      id: currentQuestion.id,
      response: choosen,
    });
  };

  return (
    <div className=" flex flex-col md:flex-row gap-8 md:items-start items-center md:justify-around justify-stretch w-full max-w-5xl mx-auto">
      <div className="md:basis-1/2 w-full sm:w-fit">
        <p className=" text-xl xs:text-2xl sm:text-3xl font-semibold border border-foreground border-dashed px-4 py-2  rounded-md">
          {index + 1}. {currentQuestion.question}
        </p>
        <Editor isOptionChosen={!!correct} />
      </div>
      <div className="md:basis-1/2 w-full sm:w-fit">
        <div className=" w-full flex flex-col gap-4">
          {currentQuestion.options.map((option) => (
            <Option
              text={option.text}
              value={option.value}
              className={cn(
                correct === option.value ? "bg-green-200" : "",
                incorrect === option.value ? "bg-red-200" : ""
              )}
              onClick={() => handleClick(option.value)}
            />
          ))}
        </div>
        <Explanation isOptionChosen={!!correct} />
      </div>
    </div>
  );
}

type OptionProps = {
  value: string;
  text: string;
};
const Option = ({
  children,
  className,
  text,
  value,
  ...props
}: HTMLMotionProps<"button"> & OptionProps) => {
  const highlightedText = text.replaceAll(
    /`(.*?)`/g,
    ` <span class="bg-foreground text-white px-1 py-1 rounded-md mx-1">$1</span>`
  );
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "text-wrap  bg-white text-foreground font-medium pl-4 pr-8 py-2 rounded-md flex items-start gap-4 shadow-sm shadow-black/30",
        className
      )}
      {...props}
    >
      <span className=" inline-block text-primary font-semibold text-2xl">
        {value}.
      </span>
      <div
        dangerouslySetInnerHTML={{ __html: highlightedText }}
        className=" py-[2px]"
      />
    </motion.button>
  );
};
