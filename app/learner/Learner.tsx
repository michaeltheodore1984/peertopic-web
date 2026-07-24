'use client';

import { useRouter } from "next/navigation";
import PeerDashboard from "../peer/component";
import { User } from "@/lib/models";

interface RoleProps {
    learner: User;
}

export default function LearnerComponent({ learner }: RoleProps) {
    return (
        <div className="min-h-screen bg-gray-50 py-4">
            <div className="flex flex-col py-4 sm:flex-row sm:items-center sm:justify-between space-y-4 px-6 sm:space-y-0">
                <h1 className="text-2xl font-bold text-gray-900">PeerTopic
                    <span className="ml-2 text-green-600">Learner</span></h1>
                <RoleToggleLearner learner={learner}/>
            </div>
            {/* Cards Grid */}
           
            <PeerDashboard />

        </div>
    );
}

function RoleToggleLearner({learner}: RoleProps) {

    const router = useRouter();

    const handleToggle = () => {
        router.replace('/tutor');
    };
    return (
        <div className="flex items-center space-x-4">
            <span className=" text-gray-700 text-lg font-bold">Hi, {learner.firstName}</span>
            <button
                className="relative w-18 h-7 rounded-full transition-colors bg-green-500"
                onClick={handleToggle}
            >
                <span
                    className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                />
            </button>
            <span className="font-medium text-gray-700 text-lg">Tutor</span>
        </div>
    );
}

