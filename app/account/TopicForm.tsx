'use client';
import { Topic } from '@/lib/models';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Tutor {
    id: number;
    hourlyRate: number;
    lessonsLeft: number;
    earnings: number;
}

interface AccountFormProps {
    tutor: Tutor;
    myTopics: Topic[];
}

export default function TopicForm({ tutor, myTopics }: AccountFormProps) {
    const [topics, setTopics] = useState<Topic[]>([]);

    // After fetching user
    useEffect(() => {
        setTopics(myTopics)
    }, [tutor]);

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Topics</h2>
                {/* <ul className="text-gray-600 text-sm space-y-1">
                    {tutor.topics.length == 0 ? 'No topics' :
                        topics.map(topic => <li key={topic.id}>{topic.name}</li>)}
                </ul> */}
            </div>
            <Link href="/topics">
                <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Manage Topics
                </button>
            </Link>
        </div>
    );
}