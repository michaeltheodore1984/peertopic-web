import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import SignInPage from "../../signin/page";
import { Booking, Tutor, User } from "@/lib/models";
import { notFound } from "next/navigation";
import ReviewPage from "./ReviewPage";

export default async function Review({
    params,
}: {
    params: Promise<{ tutorId: number; }>;
}) {
    const { tutorId } = await params;

    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page={`/review/${tutorId}`} />;

    const userId = session?.user.id;

    const userRecord = await User.findByPk(userId);

    if (!userRecord) return notFound();

    const booking = await Booking.findOne({ where: { tutorId: tutorId, studentId: userId } });

    if (!booking) return notFound();

    const tutor = await Tutor.findOne({ where: { userId: tutorId }, include: { model: User, as: "user", attributes: ['id', 'firstName'] } })

    if (!tutor) return notFound;

    return (
        <div className="bg-gray-200 py-6 px-4 shadow-md text-gray-800 h-[100dvh]">
            <div className="max-w-xl mx-auto">
                <ReviewPage tutor={tutor.toJSON()} student={userRecord.toJSON()} booking={booking.toJSON()} />
            </div>
        </div>
    );
}
