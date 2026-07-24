import ProfilePage from './ProfilePage';
import { Booking, Chat, ProfileImage, Tutor, User } from '@/lib/models';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInPage from '../signin/page';
import { notFound } from 'next/navigation';
import { Op } from 'sequelize';

const ProfileForm = async () => {

    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page="/profile" />;

    const userId = session?.user.id;

    const userRecord = await User.findByPk(userId, {
        include: [
            { model: ProfileImage, as: 'profileImage', attributes: ['id', 'url'] },
            { model: Tutor, as: 'tutorProfile' }]
    });

    if (!userRecord) return notFound();

    const bookings = await Booking.findAll({
        where: {
            studentId: userId, start: {
                [Op.gt]: new Date()
            }
        },
        include: [
            {
                model: User,
                as: "tutor",
                attributes: ["id", "firstName"],
                include: [
                    {
                        model: Chat,
                        as: "sentChats",
                        where: {
                            receiverId: userId   // student is receiver
                        },
                        required: false,
                        attributes: ["id"]
                    },
                    {
                        model: Chat,
                        as: "receivedChats",
                        where: {
                            senderId: userId     // student is sender
                        },
                        required: false,
                        attributes: ["id"]
                    },
                    {
                        model: ProfileImage,
                        as: 'profileImage'
                    }
                ]
            },
            {
                model: User,
                as: "student",
                attributes: ["id", "firstName"]
            }
        ]
    });


    const transformedBookings = await Promise.all(
        bookings.map(async (b) => {
            const msgJSON = b.toJSON();
            const tutor = msgJSON.tutor;

            const chat =
                tutor.sentChats?.[0] ??
                tutor.receivedChats?.[0] ??
                null;

            return {
                id: msgJSON.id,
                studentId: msgJSON.student.id,
                profileImage: tutor.profileImage.url,
                tutorFirstName: msgJSON.tutor.firstName,
                start: msgJSON.start,
                chatId: chat.id! || null
            };
        })
    );

    return (
        <div data-testid="profile-pw" className="min-h-screen bg-gray-200 text-gray-800">
            <ProfilePage user={userRecord.toJSON()} bookings={transformedBookings} />
        </div>

    );
};

export default ProfileForm;
