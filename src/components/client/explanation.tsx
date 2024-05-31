import { cn } from "@/lib/utils";
import { useSingleStore } from "@/store";

export function Explanation({ isOptionChosen }: { isOptionChosen: boolean }) {
  const { currentQuestion, isShowing, hideExplanation, showExplanation } =
    useSingleStore((s) => ({
      currentQuestion: s.currentQuestion,
      isShowing: s.explanation,
      showExplanation: s.showExplanation,
      hideExplanation: s.hideExplanation,
    }));
  const handler = () => {
    if (!isOptionChosen) return;

    if (!isShowing) showExplanation();
    else hideExplanation();
  };
  return (
    <div className=" p-2 max-w-80">
      <button onClick={handler}>Explanation</button>
      <div
        className={cn("p-4 border border-white", !isShowing ? "hidden" : "")}
      >
        {currentQuestion?.explanation}
      </div>
    </div>
  );
}
