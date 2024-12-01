import { NextRequest, NextResponse } from "next/server";
import { CountryWithLang, supportedLanguages } from "./lib/constants";

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  const ips = headers.get("x-forwarded-for");
  if (!ips) {
    return NextResponse.redirect(new URL("/english", request.url));
  }
  const ip = ips.split(",")[0];
  if (ip === "::1") {
    return NextResponse.redirect(new URL("/english", request.url));
  }
  const ipDataRes = await fetch(`https://ipinfo.io/${ip}/json`);
  const ipData = await ipDataRes.json();
  console.log(ipData);
  const country = ipData.country as string;
  const isSupported = CountryWithLang[country].filter((lang) =>
    supportedLanguages.includes(lang)
  );
  console.log(isSupported);
  if (!isSupported.length) {
    return NextResponse.redirect(new URL("/english", request.url));
  } else {
    return NextResponse.redirect(new URL(`/${isSupported[0]}`, request.url));
  }
}

export const config = {
  matcher: "/",
};
