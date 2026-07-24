'use client';

import { Tutor } from "@/lib/models";
import { useRouter } from "next/navigation";

interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    tutorProfile: Tutor;
}

interface RoleProps {
    user: UserInterface;
}

export function RoleToggleTutor({ user }: RoleProps) {

    const router = useRouter();

    async function handleToggle() {
        if (user.tutorProfile) {
            router.push('/cancel');
            return;
        }
        router.push('/onboarding')
    }

    return (
        <div className="flex items-center space-x-4">
            <button
                className={`text-white relative w-18 h-7 rounded-full transition-colors ${user.tutorProfile?.active ? 'bg-green-500' : 'bg-gray-400'}`}
                onClick={handleToggle}>
                Tutor
                <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform ${user.tutorProfile?.active ? 'translate-x-11' : 'translate-x-0'}`} />

            </button>
        </div>
    );
}
