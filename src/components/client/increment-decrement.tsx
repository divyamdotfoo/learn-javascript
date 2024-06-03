import { useSingleStore } from "@/store";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

export const Increment = React.memo(() => {
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
});

Increment.displayName = "Increment";

export const Decrement = React.memo(() => {
  const decrementIndex = useSingleStore((s) => s.decrementIndex);
  return (
    <NavigateBtn className=" bg-foreground " onClick={decrementIndex}>
      prev
    </NavigateBtn>
  );
});

Decrement.displayName = "Decrement";
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
