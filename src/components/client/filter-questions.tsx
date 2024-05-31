import { updateLocalStorage } from "@/lib/use-localstorage";
import { cn } from "@/lib/utils";
import { useSingleStore } from "@/store";
import { usePathname } from "next/navigation";

export function FilterQuestions({
  allQuestionsLength,
}: {
  allQuestionsLength: number;
}) {
  const { questions, changeCategory, category } = useSingleStore((s) => ({
    questions: s.questions,
    changeCategory: s.setCategory,
    category: s.category,
  }));
  const pathname = usePathname().slice(1);
  return (
    <div className=" flex items-center gap-4 py-4">
      <button
        className={cn(
          " border border-white p-2",
          category === "all" ? " bg-green-300" : ""
        )}
        onClick={() => {
          changeCategory("all");
          updateLocalStorage("change-category", pathname, { category: "all" });
        }}
      >
        all <span>{allQuestionsLength}</span>
      </button>
      <button
        className={cn(
          " border border-white p-2",
          category === "solved" ? " bg-green-300" : ""
        )}
        onClick={() => {
          changeCategory("solved");
          updateLocalStorage("change-category", pathname, {
            category: "solved",
          });
        }}
      >
        solved <span>{questions.solved.length}</span>
      </button>
      <button
        className={cn(
          " border border-white p-2",
          category === "unsolved" ? " bg-green-300" : ""
        )}
        onClick={() => {
          changeCategory("unsolved");
          updateLocalStorage("change-category", pathname, {
            category: "unsolved",
          });
        }}
      >
        unsolved <span>{questions.unsolved.length}</span>
      </button>
    </div>
  );
}
