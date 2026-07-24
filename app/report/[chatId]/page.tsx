
import { Chat, User } from '@/lib/models';
import { getServerSession } from 'next-auth/next';
import SignInPage from '../../signin/page';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { notFound } from 'next/navigation';
import ReportPage from './ReportPage';

export default async function ReportUser({
    params,
}: {
    params: Promise<{ chatId: number; }>;
}) {
    const { chatId } = await params;

    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page={`/report/${chatId}`} />;

    const user = await User.findOne({ where: { id: session.user.id } })

    if (!user) {
        return notFound();
    }

    const chat = await Chat.findByPk(chatId);

    if (!chat) return notFound();

    if (chat.senderId !== user.id && chat.receiverId !== user.id) {
        return notFound();
    }

    const reportedUserId = chat.senderId === user.id ? chat.receiverId : chat.senderId;

    return (
        <section data-testid='report-page-pw' className='max-w-3xl mx-auto'>
            <ReportPage reporterId={user.id} reportedUserId={reportedUserId} chatId={chat.id} />
        </section>
    );
}
