'use client';
import { Lesson, Tutor, User } from '@/lib/models';

interface TutorWithLessons extends Tutor {
    Lessons: Lesson[];
}

interface UserWithTutor extends User {
    tutorProfile?: TutorWithLessons | null;
}

interface AccountFormProps {
    user: UserWithTutor;
}

export default function Calendar({ user }: AccountFormProps) {

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Upcoming lessons</h2>
                <p className="font-bold text-green-600">{user.tutorProfile?.Lessons[0] ? user.tutorProfile?.Lessons[0].topic : 'No upcoming lessons'}</p>
            </div>

        </div>
    );
}

