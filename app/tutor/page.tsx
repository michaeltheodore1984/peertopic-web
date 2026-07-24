import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignInPage from "../signin/page";
import TutorPage from "./TutorPage";
import { notFound } from "next/navigation";
import { Booking, Chat, ProfileImage, Review, Topic, Tutor, User } from "@/lib/models";
import { Op } from "sequelize";
import sequelize from "sequelize/lib/sequelize";

interface AvgRatingResult {
    avgRating: string | null;   // AVG returns string or null
    reviewCount: string;
}

export default async function TutorDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page="/tutor" />;

    const userId = session?.user.id;

    const userRecord = await User.findByPk(userId, { include: [{ model: Tutor, as: 'tutorProfile', attributes: ['id', 'hourlyRate'], include: [{ model: Topic, as: 'topics' }] }] });

    if (!userRecord?.tutorProfile) return notFound();

    const avgRatingRaw = await Review.findOne({
        where: { tutorId: userId },
        attributes: [
            [sequelize.fn("AVG", sequelize.col("rating")), "avgRating"],
            [sequelize.fn("COUNT", sequelize.col("id")), "reviewCount"],
        ],
        raw: true,
    }) as AvgRatingResult | null;

    const avg = Number(avgRatingRaw?.avgRating || 0);
    const roundedAvg = Number(avg.toFixed(1));

    const bookings = await Booking.findAll({
        where: {
            tutorId: userId, start: {
                [Op.gt]: new Date()
            }
        },
        include: [
            {
                model: User,
                as: "tutor",
                attributes: ["id", "firstName",],
            },
            {
                model: User,
                as: "student",
                attributes: ["id", "firstName"],
                include: [
                    { model: ProfileImage, as: 'profileImage' },
                    {
                        model: Chat,
                        as: "sentChats",
                        where: {
                            receiverId: userId
                        },
                        required: false,
                        attributes: ["id"]
                    },
                    {
                        model: Chat,
                        as: "receivedChats",
                        where: {
                            senderId: userId
                        },
                        required: false,
                        attributes: ["id"]
                    }
                ]
            }
        ]
    });

    const transformedBookings = bookings.map(b => {
        const msgJSON = b.toJSON();
        const student = msgJSON.student;

        const chat =
            student.sentChats?.[0] ??
            student.receivedChats?.[0] ??
            null;

        return {
            id: msgJSON.id,
            tutorId: msgJSON.tutor.id,
            studentId: student.id,
            profileImage: student.profileImage?.url || null,
            studentFirstName: msgJSON.student.firstName,
            start: msgJSON.start,
            chatId: chat?.id || null,

        };
    });


    return (
        <div data-testid="tutor-pw" className="py-10 px-6 text-gray-800 bg-gray-200 h-[100dvh]">
            <main className="max-w-4xl mx-auto">
                <TutorPage bookings={transformedBookings} user={userRecord.toJSON()} avgRating={roundedAvg} />
            </main>
        </div>
    );
}
