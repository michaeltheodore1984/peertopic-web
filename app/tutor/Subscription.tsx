'use client';
import { Tutor, User } from '@/lib/models';
import { useEffect, useState } from 'react';


interface UserWithTutor extends User {
    tutorProfile?: Tutor | null;
}

interface AccountFormProps {
    user: UserWithTutor;
}

export default function Subscription({ user }: AccountFormProps) {

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Subscription</h2>
                <p className="text-2xl font-bold text-green-600">{user.tutorProfile?.lessonsLeft}</p>
                <p className="text-sm text-gray-500 mt-1">Lessons remaining</p>
            </div>

        </div>
    );
}

