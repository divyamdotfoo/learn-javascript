import { redirect } from "next/navigation";
import { headers } from "next/headers";
export default async function Page() {
  console.log(headers().get("x-forwarded-for"));
  redirect("/english");
}
