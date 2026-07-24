import { Booking, Chat, ProfileImage, Tutor, User } from "@/lib/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignInPage from "../signin/page";
import { Op } from "sequelize";
import HistoryPage from "./HistoryPage";
import { notFound } from "next/navigation";
import Review from "@/models/Review";

export default async function History() {
    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page="/history" />;

    const userId = session?.user.id;

    const userRecord = await User.findByPk(userId, { include: [{ model: ProfileImage, as: 'profileImage', attributes: ['id', 'url'] }, { model: Tutor, as: 'tutorProfile' }] });

    if (!userRecord) return notFound();

    const studentBookings = await Booking.findAll({
        where: {
            studentId: userId, start: {
                [Op.lt]: new Date() // only bookings in the past
            }
        },
        include: [
            {
                model: User,
                as: "tutor",
                attributes: ["id", "firstName"],

            },
            {
                model: User,
                as: "student",
                attributes: ["id", "firstName"]
            },
            {
                model: Review, attributes: ['id', 'bookingId']
            }
        ]
    });

    const transformedBookings = await Promise.all(
        studentBookings.map(async (b) => {
            const msgJSON = b.toJSON();

            return {
                id: msgJSON.id,
                tutorId: msgJSON.tutor.id,
                studentId: msgJSON.student.id,
                avatar: msgJSON.tutor.avatar,
                tutorFirstName: msgJSON.tutor.firstName,
                start: msgJSON.start,
                bookingId: msgJSON.Review?.bookingId || null
            };
        })
    );

    return (
        <div data-testid="history-pw" className="px-6 text-gray-800 bg-gray-200">
            <main className="max-w-4xl mx-auto">
                <HistoryPage bookings={transformedBookings} user={userRecord.toJSON()} />
            </main>
        </div>
    );
}
