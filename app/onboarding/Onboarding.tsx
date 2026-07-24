'use client';

import { useState } from 'react';
import { Tutor, User } from '@/lib/models';
import { useRouter } from 'next/navigation';
import { becomeTutor } from '@/lib/actions';

interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    tutorProfile: Tutor;
}

interface TutorOnboardingProps {
    user: UserInterface;
}

export function Onboarding({ user }: TutorOnboardingProps) {
    const [isTutor, setIsTutor] = useState(!!user.tutorProfile);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleBecomeTutor() {
        await becomeTutor(user.id, true);
        router.push('/tutor')
    }

    return (
        <div className="min-h-screen bg-[#f0ead6] text-gray-800 p-6 md:p-12 flex flex-col items-center">
            {/* Hero */}
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Tutor on PeerTopic and earn.</h1>
                <p className="text-lg md:text-xl text-gray-700">
                    Teach learners, earn money, and get your first <span className="font-semibold">2 lessons free!</span>
                </p>
            </header>

            {/* How it works */}
            <section className="grid md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Step 1</h3>
                    <p>Create your tutor profile and set your hourly rate.</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Step 2</h3>
                    <p>Get <span className="font-bold">2 free lessons</span> to start teaching without paying.</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Step 3</h3>
                    <p>Continue earning with a subscription of <span className="font-bold">$9/month</span>. Cancel anytime.</p>
                </div>
            </section>

            {/* Pricing & CTA */}
            <section className="mb-12 w-full max-w-3xl flex flex-col md:flex-row gap-6 items-center justify-center">
                <div className="bg-green-100 rounded-lg p-6 flex-1 text-center">
                    <h3 className="text-xl font-semibold mb-2">Free Trial</h3>
                    <p>2 lessons | $0</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-6 flex-1 text-center">
                    <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
                    <p>Unlimited lessons | $9/month</p>
                </div>
            </section>

            <button
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition ${loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                onClick={handleBecomeTutor}
            // disabled={loading || isTutor}
            >
                {/* {isTutor ? 'You are now a Tutor' : loading ? 'Processing...' : 'Start Teaching'} */}
                Become a Tutor
            </button>

            {/* Benefits */}
            <section className="mt-16 grid md:grid-cols-3 gap-6 w-full max-w-5xl text-center">
                <div className="p-4">
                    <h4 className="font-semibold mb-1">Flexible Schedule</h4>
                    <p>Teach when it fits your schedule.</p>
                </div>
                <div className="p-4">
                    <h4 className="font-semibold mb-1">Earn Extra Income</h4>
                    <p>Get paid for every lesson you teach.</p>
                </div>
                <div className="p-4">
                    <h4 className="font-semibold mb-1">Secure Platform</h4>
                    <p>Safe and easy-to-use platform for tutors and learners.</p>
                </div>
            </section>
        </div>
    );
}
