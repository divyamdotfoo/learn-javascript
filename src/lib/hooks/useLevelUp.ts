import { useSingleStore } from "@/store";

export const useLevelUp = () => {
  const questions = useSingleStore((s) => s.questions);
};
