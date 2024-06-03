import { cn } from "@/lib/utils";
import { useSingleStore } from "@/store";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
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

  if (!currentQuestion) return;
  const highlightedText = currentQuestion.explanation.replaceAll(
    /`(.*?)`/g,
    ` <span class="bg-foreground text-white px-3 my-1 mx-1 rounded-sm inline-block">$1</span>`
  );
  return (
    <div className=" pt-6">
      <button onClick={handler} className=" flex flex-col items-start">
        <p
          className={cn(
            "font-semibold text-primary pt-2 text-xl underline",
            !isOptionChosen ? "opacity-90" : ""
          )}
        >
          <span>Explanation</span>
          {isShowing ? (
            <ChevronUpIcon className=" w-5 h-5 inline" />
          ) : (
            <ChevronDownIcon className=" w-5 h-5 inline" />
          )}
        </p>
        {!isOptionChosen ? (
          <p className=" text-sm font-extrabold opacity-80">
            Attempt the question first
          </p>
        ) : null}
      </button>
      {isShowing ? (
        <div
          className={cn(
            " bg-white shadow-sm text-sm shadow-black/30 p-4 my-2 rounded-md "
          )}
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />
      ) : null}
    </div>
  );
}
