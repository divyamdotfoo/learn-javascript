import { useSingleStore } from "@/store";

export function Increment() {
  const incrementIndex = useSingleStore((s) => s.incrementIndex);
  return (
    <button className=" border border-white" onClick={incrementIndex}>
      next
    </button>
  );
}
export function Decrement() {
  const decrementIndex = useSingleStore((s) => s.decrementIndex);
  return (
    <button className=" border border-white" onClick={decrementIndex}>
      prev
    </button>
  );
}
