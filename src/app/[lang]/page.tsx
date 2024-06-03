import { Main } from "@/components/client/main";
import { Header } from "@/components/header";
import { PATHS, testQuestions } from "@/lib/constants";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Reset } from "@/components/client/reset";
export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = params;
  try {
    // const questions = await buildRegistryForLang(PATHS[lang]);
    // const cached = await getCachedData(lang);
    // const questions: Question[] = JSON.parse(cached);
    const questions = testQuestions;
    return (
      <div className="relative max-w-7xl mx-auto py-4 sm:px-6 px-4 overflow-x-hidden">
        <Header defaultLang={lang} />
        <Main allQuestions={questions} />
        <p className=" font-extrabold text-sm opacity-80 md:hidden text-center my-2">
          Swipe ahead <ArrowRightIcon className="inline" />
        </p>
        <Socials />
        <Reset />
      </div>
    );
  } catch (e) {}
}

export async function generateStaticParams() {
  return Object.keys(PATHS).map((s) => ({ lang: s }));
}

function Socials() {
  return (
    <div className=" flex items-center gap-4 w-full justify-center py-6">
      <Link
        href={"https://github.com/divyamdotfoo/learn-javascript"}
        className=" w-7 h-7 block hover:scale-105 transition-all"
        target="_blank"
      >
        <svg
          viewBox="0 0 98 96"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            fill="#000"
          />
        </svg>
      </Link>
      <Link
        href={"https://twitter.com/divyamdotfoo"}
        className=" hover:scale-105 transition-all"
        target="_blank"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className=" h-6 fill-black">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      </Link>
    </div>
  );
}
