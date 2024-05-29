import { redirect } from "next/navigation";
export async function GET(req: Request) {
  console.log(req.headers);
  redirect("/english");
}
