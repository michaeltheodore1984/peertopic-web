import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { User } from "@/lib/models";
import SignInPage from "../signin/page";


const Dashboard = async () => {
    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page='/dashboard' />;

    const userId = session?.user.id;

    const user = await User.findByPk(userId);

    if (!user) return <p>No user found</p>;

    return (
        <div className="min-h-screen bg-gray-200 text-gray-800">

            {/* Dashboard Content */}
            <main className="p-6">
                <h1 className="font-semibold mb-8 text-lg">Welcome, {user.firstName}.</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow">Card 1</div>
                    <div className="bg-white p-4 rounded shadow">Card 2</div>
                    <div className="bg-white p-4 rounded shadow">Card 3</div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
