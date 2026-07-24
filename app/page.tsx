import { getServerSession } from "next-auth";
import HomePage from "./HomePage";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function AppLanding() {
  const session = await getServerSession(authOptions);
  let header = 'default';

  if (session) {
    header = 'session';
  }

  return (
    <main>
      <HomePage header={header}/>
    </main>
  );
}
