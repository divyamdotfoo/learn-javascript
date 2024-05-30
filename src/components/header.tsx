import { SelectLanguage } from "./client/select-language";

export function Header({ defaultLang }: { defaultLang: string }) {
  return (
    <div className=" w-full px-4 py-2 flex items-center justify-between">
      <h1 className=" text-3xl font-bold">Learn Javascript</h1>
      <SelectLanguage defaultValue={defaultLang} />
    </div>
  );
}
