export default function Page({ params }: { params: { lang: string } }) {
  return <h1>{params.lang}</h1>;
}
