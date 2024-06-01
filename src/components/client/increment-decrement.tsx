import { useSingleStore } from "@/store";
import { usePathname } from "next/navigation";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export function Increment() {
  const pathname = usePathname().slice(1);
  const incrementIndex = useSingleStore((s) => s.incrementIndex);
  return (
    <NavigateBtn
      className=" bg-primary"
      onClick={() => {
        incrementIndex();
      }}
    >
      next
    </NavigateBtn>
  );
}
export function Decrement() {
  const decrementIndex = useSingleStore((s) => s.decrementIndex);
  return (
    <NavigateBtn className=" bg-foreground " onClick={decrementIndex}>
      prev
    </NavigateBtn>
  );
}

const NavigateBtn = ({
  children,
  className,
  ...props
}: HTMLMotionProps<"button">) => {
  return (
    <motion.button
      {...props}
      className={cn(
        "text-white text-sm px-6 py-1 shadow-sm shadow-black/20 rounded-full",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};
