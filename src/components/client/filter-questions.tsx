import { updateLocalStorage } from "@/lib/use-localstorage";
import { cn } from "@/lib/utils";
import { useSingleStore } from "@/store";
import { usePathname } from "next/navigation";
import { motion, HTMLMotionProps } from "framer-motion";
export function FilterQuestions({
  allQuestionsLength,
}: {
  allQuestionsLength: number;
}) {
  const { questions, updateCategory, category } = useSingleStore((s) => ({
    questions: s.questions,
    updateCategory: s.updateCategory,
    category: s.category,
  }));
  const pathname = usePathname().slice(1);
  return (
    <div className=" flex items-center gap-4">
      <FilterBtn
        onClick={() => {
          updateCategory("all");
          updateLocalStorage("change-category", pathname, { category: "all" });
        }}
        className={cn(category === "all" ? "bg-primary text-white" : "")}
      >
        all <span className=" pl-1">({allQuestionsLength})</span>
      </FilterBtn>
      <FilterBtn
        onClick={() => {
          updateCategory("solved");
          updateLocalStorage("change-category", pathname, {
            category: "solved",
          });
        }}
        className={cn(category === "solved" ? "bg-primary text-white" : "")}
      >
        solved
      </FilterBtn>
      <FilterBtn
        onClick={() => {
          updateCategory("unsolved");
          updateLocalStorage("change-category", pathname, {
            category: "unsolved",
          });
        }}
        className={cn(category === "unsolved" ? "bg-primary text-white" : "")}
      >
        unsolved
      </FilterBtn>
    </div>
  );
}

const FilterBtn = ({
  className,
  children,
  ...props
}: HTMLMotionProps<"button">) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`rounded-full text-sm px-4 py-1 shadow-sm shadow-black/30 bg-foreground text-white ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
