import { User } from "@/lib/models";
import CancelPage from "./CancelPage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignInPage from "../signin/page";

export default async function CancelTutor() {
  const session = await getServerSession(authOptions);

  if (!session) return <SignInPage />;

  const userId = session?.user.id;

  return (
    <CancelPage userId={userId} />
  );
}
