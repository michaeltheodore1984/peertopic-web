
import { User, Message, Chat } from '@/lib/models';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import SignInPage from '../../signin/page';
import { notFound } from 'next/navigation';
import ChatMessages from './ChatMessages';

interface MessageWithRelations extends Message { }

export default async function ChatPage({
    params,
}: {
    params: Promise<{ chatId: number; }>;
}) {
    const { chatId } = await params;
    const session = await getServerSession(authOptions);

    const redirect = '/chat/' + chatId;

    if (!session) return <SignInPage page={redirect} />;


    const user = await User.findOne({ where: { id: session.user.id }, attributes: ['id', 'firstName'] })

    if (!user) {
        return notFound();
    }

    const chat = await Chat.findByPk(chatId, {
        include: [
            { model: User, as: "sender", attributes: ["id", "firstName"] },
            { model: User, as: "receiver", attributes: ["id", "firstName"] },
        ],
    });

    if (!chat || (chat.senderId !== Number(user.id) && chat.receiverId !== Number(user.id))) {
        return notFound();
    }

    const otherUser =
        chat.senderId === Number(session.user.id) ? chat.receiver : chat.sender;

    const messages = await Message.findAll({ where: { chatId }, include: { model: User, as: 'sender', attributes: ['id', 'firstName'] } });

    const transformedMessages = (messages as MessageWithRelations[]).map((m) => ({
        id: m.id,
        chatId: m.chatId,
        senderId: m.senderId,
        content: m.content,
        firstNameSender: m.senderId == chat.sender.id ? chat.sender.firstName : chat.receiver.firstName || 'Unknown',
        timestamp: new Date(m.createdAt).getTime(),
    }));

    return (
        <section data-testid='chat-pw' className='max-w-3xl mx-auto'>
            <ChatMessages messageList={transformedMessages} chatId={chatId} sender={user.toJSON()} otherUser={otherUser.toJSON()} />
        </section>
    );
}
