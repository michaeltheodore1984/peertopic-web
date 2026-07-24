import { getServerSession } from "next-auth/next";
import { MessagesPage } from "./MessagesPage";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignInPage from "../signin/page";
import { Chat, Message, User } from "@/lib/models";
import { Op } from "sequelize";

export default async function Messages() {
    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page='/messages' />;

    const userId = session.user.id;

    const messages = await Message.findAll({
        include: [
            {
                model: Chat,
                as: 'chat',
                include: [
                    {
                        model: User,
                        as: 'sender',
                        attributes: ['id', 'firstName']
                    },
                    {
                        model: User,
                        as: 'receiver',
                        attributes: ['id', 'firstName']
                    }
                ],
                where: {
                    [Op.or]: [
                        { senderId: userId },
                        { receiverId: userId }
                    ]
                },
            },
            {
                model: User,
                as: 'sender',
                attributes: ['id', 'firstName']
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    const transformedMessages = await Promise.all(
        messages.map(async (m) => {
            const msgJSON = m.toJSON();

            return {
                id: msgJSON.id,
                chatId: msgJSON.chat.id,
                senderId: msgJSON.sender.id,
                firstNameSender: userId == msgJSON.chat.sender.id ? msgJSON.chat.receiver.firstName : msgJSON.chat.sender.firstName || 'Unknown',
                firstNameReceiver: msgJSON.chat.receiver.firstName || 'Unknown',
                content: msgJSON.content,
                timestamp: new Date(msgJSON.createdAt).getTime(),
            };
        })
    );

    //when sending i want to show the receiver and when receving i want to show the sender


    return (
        <>
            <MessagesPage messages={transformedMessages} sender={userId} />
        </>
    );
}
