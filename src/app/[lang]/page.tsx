import { PATHS } from "@/lib/constants";

export default function Page({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return <h1>{params.lang}</h1>;
}

export async function generateStaticParams() {
  return Object.keys(PATHS).map((s) => ({ lang: s }));
}
