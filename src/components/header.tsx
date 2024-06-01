import { SelectLanguage } from "./client/select-language";

export function Header({ defaultLang }: { defaultLang: string }) {
  return (
    <div className=" w-full flex sm:items-center items-start justify-between">
      <h1 className=" sm:text-4xl xs:text-3xl text-2xl font-extrabold">
        <span className=" text-primary">Learn</span> Javascript
      </h1>
      <SelectLanguage defaultValue={defaultLang} />
    </div>
  );
}
