'use server';

import { revalidatePath } from 'next/cache';
import { Chat, Lesson, sequelize } from '@/lib/models';
import { Message } from '@/models/Message';

export async function sendMessage(
    tutorId: number,
    learnerId: number,
    senderId: number,
    content: string
) {
    if (!content.trim()) return;
    const tutor = await sequelize.transaction(async (t) => {
        // Get or create chat between tutor + learner
        const [chat] = await Chat.findOrCreate({
            where: { tutor_id: tutorId, learner_id: learnerId }, transaction: t
        });

        // Create the message
        await Message.create({
            chatId: chat.id,
            senderId: senderId,
            content,
        }, { transaction: t }
        );

        // Refresh the chat page
        revalidatePath(`/chat/${tutorId}/${learnerId}`);
    })
}

export async function bookLesson(
    tutorId: number,
    learnerId: number,
) {

    await sequelize.transaction(async (t) => {
        // Get or create chat between tutor + learner
       /*  const [chat] = await Chat.findOrCreate({
            where: { tutorId: tutorId, learnerId: learnerId }, transaction: t
        }); */

        // Create the message
        await Lesson.create({
            tutorId: tutorId,
            studentId: 1,
            topic: 'Java',
            duration: 1,
            status: 'proposed'
        }, { transaction: t }
        );
    })
}
