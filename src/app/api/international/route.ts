import {
  CountryWithLang,
  fallbackLanguage,
  supportedLanguages,
} from "@/lib/constants";
import { redirect } from "next/navigation";
export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for");
  if (ip == "::1") redirect("/english");
  if (!ip) redirect("/english");
  console.log(ip);
  const ipDataRes = await fetch(`https://ipinfo.io/${ip}/json`);
  const ipData = await ipDataRes.json();
  console.log(ipData);
  const country = ipData.country as string;
  const isSupported = CountryWithLang[country].filter((lang) =>
    supportedLanguages.includes(lang)
  );
  console.log(isSupported);
  if (!isSupported.length) redirect(`/${fallbackLanguage}`);
  redirect(`/${isSupported[0]}`);
}
