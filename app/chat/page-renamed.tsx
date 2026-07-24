import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Chat, Tutor, User } from "@/lib/models";
import { notFound, redirect } from "next/navigation";
import SignInPage from "../signin/page";
import { Op } from "sequelize";

interface ChatPageProps {
    searchParams: Promise<{ id?: string }>;
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
    const params = await searchParams;
    const id = Number(params?.id);

    if (!id) return notFound();

    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page='/chat' />;

    const userId = session.user.id;

    if (Number(userId) === Number(id)) {
        return notFound();
    }

    // Find existing chat or create new
    let chat = await Chat.findOne({
        where: {
            [Op.or]: [{ senderId: userId, receiverId: id },
            { senderId: id, receiverId: userId },]
        },
    });

    if (!chat) {
        chat = await Chat.create({ senderId: userId, receiverId: id });
    }

    // Redirect to the actual chat page
    redirect(`/chat/${chat.id}`);
}
