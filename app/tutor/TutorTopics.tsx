'use client';
import { Topic, Tutor, User } from '@/lib/models';
import Link from 'next/link';

interface TutorWithTopics extends Tutor {
    topics?: Topic[] | null;
}

interface UserWithTutor extends User {
    tutorProfile?: TutorWithTopics | null;
}

interface AccountFormProps {
    user: UserWithTutor;
}

export default function TutorTopics({ user }: AccountFormProps) {

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Topics</h2>
                <div className="flex flex-wrap gap-2 text-gray-800">
                    {
                        user.tutorProfile?.topics?.length == 0 ? 'No topics' :
                            user.tutorProfile?.topics?.map(topic => <span
                                key={topic.id}
                                className="px-3 py-1 bg-blue-500 text-white rounded-full cursor-pointer text-sm hover:bg-blue-600">
                                {topic.name}
                            </span>)
                    }
                </div>
                <Link href='/topics'>
                    <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Manage Topics
                    </button>
                </Link>
            </div>

        </div>
    );
}

