"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { supportedLanguages } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSingleStore } from "@/store";
export function SelectLanguage({ defaultValue }: { defaultValue: string }) {
  const { updateCategory } = useSingleStore((s) => ({
    updateCategory: s.updateCategory,
  }));
  const router = useRouter();
  return (
    <div className=" relative">
      <div className=" absolute -left-[6px] -bottom-2 w-[180px] h-10 border-[2px] border-white rounded-md -z-30"></div>
      <Select
        defaultValue={defaultValue}
        onValueChange={(val) => {
          router.push(`/${val}`);
        }}
      >
        <SelectTrigger className=" w-[180px] z-40">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className=" bg-white text-foreground border-none">
          <SelectGroup>
            {supportedLanguages.map((l) => (
              <SelectItem value={l} key={l}>
                {capitalize(l)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
