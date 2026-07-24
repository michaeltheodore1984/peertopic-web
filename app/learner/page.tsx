// app/account/page.tsx
'use server';
import { Topic, Tutor, User, Lesson } from "@/lib/models";
import LearnerComponent from "./Learner";

// This file is server-only
export default async function LearnerPage() {

    const userRecord = await User.findByPk(1, {
        include: [{
            model: Tutor, as: "tutorProfile", include: [
                {
                    model: Topic,
                    as: 'topics',
                },
            ],
        }],
    });

    if (!userRecord) return <p>No user found</p>;

    const user = userRecord.toJSON();

    const tutorId = 3;

    const lessons = await Lesson.findAll({
        where: { tutorId },
        include: [
            {
                model: User,
                as: 'student', // the student
                attributes: ['id', 'firstName', 'lastName'],
            },
        ],
    });

    return (
        <LearnerComponent learner={user}/>
    );
}

