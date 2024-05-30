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
export function SelectLanguage({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(val) => router.push(`/${val}`)}
    >
      <SelectTrigger className=" w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {supportedLanguages.map((l) => (
            <SelectItem value={l} key={l}>
              {capitalize(l)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
