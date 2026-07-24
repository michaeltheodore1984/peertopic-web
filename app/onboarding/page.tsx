import { User } from "@/lib/models";
import { Onboarding } from "./Onboarding";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignInPage from "../signin/page";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  if (!session) return <SignInPage page="/onboarding" />;

  const userId = session?.user.id;

  const user = await User.findByPk(userId);

  if (!user) return <p>No user found</p>;

  return (
    <Onboarding user={user.toJSON()} />
  );
}
