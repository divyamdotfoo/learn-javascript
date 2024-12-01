import {
  updateLocalStorage,
  useLocalStorage,
} from "@/lib/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { useSingleStore } from "@/store";
import type { Answer, Question } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Explanation } from "./explanation";
import { Editor } from "./editor";
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import { useSound } from "@/lib/hooks/useSound";
import { errorSound, levelUpSound, successSound } from "@/lib/constants";
import { SymbolIcon } from "@radix-ui/react-icons";

export function Question({ allQuestions }: { allQuestions: Question[] }) {
  const [playAudio, pauseAudio] = useSound(
    0.5,
    String(Math.random()).slice(0, 5)
  );

  useLocalStorage(allQuestions);

  const pathname = usePathname().slice(1);

  const {
    index,
    currentQuestion,
    hideExplanation,
    showExplanation,
    addSolved,
    solvedLength,
    category,
  } = useSingleStore((s) => ({
    index: s.currentIndex,
    currentQuestion: s.currentQuestion,
    hideExplanation: s.hideExplanation,
    showExplanation: s.showExplanation,
    addSolved: s.addSolvedQuestion,
    isShowing: s.explanation,
    solvedLength: s.questions.solved.length,
    category: s.category,
  }));

  const [correct, setCorrect] = useState<Answer | null>(null);
  const [incorrect, setIncorrect] = useState<Answer | null>(null);

  useEffect(() => {
    if (!currentQuestion) {
      setCorrect(null);
      setIncorrect(null);
      return;
    }
    if (currentQuestion.solved) {
      showExplanation();

      if (currentQuestion.solved.response === currentQuestion.answer) {
        setCorrect(currentQuestion.answer);
        setIncorrect(null);
      } else {
        setCorrect(currentQuestion.answer);
        setIncorrect(currentQuestion.solved.response);
      }
    } else {
      setCorrect(null);
      setIncorrect(null);
      hideExplanation();
    }
  }, [currentQuestion, hideExplanation, showExplanation]);

  if (!currentQuestion && category === "solved")
    return (
      <div className=" absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 ">
        <p>You haven&apos;t completed any questions yet.</p>
      </div>
    );

  if (!currentQuestion)
    return (
      <div className=" absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SymbolIcon className=" text-primary font-extrabold w-7 h-7 animate-spin" />
      </div>
    );

  const handleClick = (choosen: Answer) => {
    if (correct) return;
    const correctAns = currentQuestion.answer;
    setCorrect(currentQuestion.answer);
    showExplanation();
    // updating client state

    addSolved(currentQuestion.id, choosen);
    updateLocalStorage("add-id", pathname, {
      id: currentQuestion.id,
      response: choosen,
    });

    if (choosen !== correctAns) {
      setIncorrect(choosen);
      // further
      playAudio(errorSound);
      return;
    }
    if ((solvedLength + 1) % 10 === 0) {
      playAudio(levelUpSound);
      // level up animation
      return;
    }
    playAudio(successSound);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestion.id}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.3, // Adjust duration for smoothness
          ease: [0.42, 0, 0.58, 1], // Cubic Bezier curve for smooth easing
        }}
        className=" flex flex-col md:flex-row gap-8 md:items-start items-center md:justify-around justify-stretch w-full max-w-5xl mx-auto"
      >
        <div className="md:basis-1/2 w-full sm:w-fit">
          <p className="text-xl xs:text-2xl sm:text-3xl font-semibold border border-foreground border-dashed px-4 py-2  rounded-md">
            {index + 1}. {currentQuestion.question}
          </p>
          <Editor isOptionChosen={!!correct} />
        </div>
        <div className="md:basis-1/2 w-full sm:w-fit">
          <div className=" w-full">
            {currentQuestion.options.map((option) => (
              <Option
                key={option.value}
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
      </motion.div>
    </AnimatePresence>
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
    ` <span class="bg-foreground text-white px-1 py-1 rounded-md mx-1 text-wrap">$1</span>`
  );

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "text-wrap mb-2 w-full  bg-white text-foreground font-medium text-start px-4 pt-3 pb-4 rounded-md shadow-sm shadow-black/30",
        "flex items-center gap-1",
        className
      )}
      {...props}
    >
      <p>
        <span className="text-primary font-semibold text-2xl inline-block translate-y-[3px] pr-1">
          {value}.
        </span>
      </p>
      <p dangerouslySetInnerHTML={{ __html: highlightedText }} />
    </motion.button>
  );
};
