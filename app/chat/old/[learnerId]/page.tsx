import { Chat, Message, User, Tutor } from '@/lib/models';
import { notFound } from 'next/navigation';
import ChatBox from '../../[chatId]/ChatBox';

export default async function ChatPageOld({
    params,
}: {
    params: Promise<{ tutorId: string; learnerId: string }>;
}) {

    const myParams = await params;

    const tutorId = Number(myParams.tutorId);
    const learnerId = Number(myParams.learnerId);

    if (isNaN(tutorId) || isNaN(learnerId)) {
        throw new Error('Invalid tutor or learner ID');
    }

    // Find chat or create if not exists
    const [chat] = await Chat.findOrCreate({
        where: { tutorId: tutorId, learnerId: learnerId },
    });

    // Fetch messages
    const messages = await Message.findAll({
        where: { chat_id: chat.id },
        include: [{ model: User, as: 'sender', attributes: ['id', 'firstName'] }],
        order: [['createdAt', 'ASC']],
    });

    // Fetch tutor info (optional)
    const tutor = await Tutor.findByPk(tutorId, {
        include: [{ model: User, as: 'user', attributes: ['firstName'] }],
    });

    if (!tutor) return notFound();

    const user = tutor.toJSON().user;

    /* function handleSend(tutorId: number, learnerId: number) {
        bookLesson(tutorId, learnerId);
    } */

    return (
        <div className="chat-page flex flex-col h-screen max-h-screen p-4 bg-[#f0ead6] text-gray-800">
            {/* Tutor info */}
            <div className="tutor-info flex items-center gap-4 mb-4">
                <img
                    alt={user.firstName}
                    className="w-12 h-12 rounded-full border-2 border-[#d4c49d]"
                />
                <div>
                    <h2 className="text-lg font-semibold">{user.firstName}</h2>
                    <p className="text-sm text-gray-700">Hourly rate: ${tutor.hourlyRate}</p>
                </div>
            </div>

            {/* Chat box */}
            {/* <ChatBox tutorId={tutorId} learnerId={learnerId} /> */}
        </div>
    );
}
