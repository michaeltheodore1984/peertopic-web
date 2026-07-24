'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { becomeTutor } from '@/lib/actions';

interface CancelTutorProps {
    userId: string;
}

export default function CancelPage({ userId }: CancelTutorProps) {
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const router = useRouter();

    async function handleCancel() {

        setLoading(true);
        try {
            //   await toggleTutorStatus(userId, false); // disable/delete tutor profile
            setDone(true);
            becomeTutor(Number(userId), false);
            // Optionally redirect back to dashboard after a few seconds
            setTimeout(() => router.push('/dashboard'), 2000);
        } catch (err) {
            console.error('Failed to cancel tutor subscription:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (done) {
        return (
            <div className="min-h-screen bg-[#f0ead6] flex flex-col items-center justify-center text-center text-gray-800 p-6">
                <h1 className="text-3xl font-bold mb-4">Subscription Cancelled</h1>
                <p className="text-lg text-gray-700">
                    You’ve successfully cancelled your tutor subscription.
                    Your profile is now inactive.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f0ead6] text-gray-800 flex flex-col items-center justify-center p-6">
            {/* Header */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Cancel Your Tutor Subscription
            </h1>
            <p className="max-w-lg text-center text-lg mb-10">
                We’re sorry to see you go!
                Cancelling your subscription will deactivate your tutor profile, and learners will no longer be able to book lessons with you.
                You can always reactivate your account later.
            </p>

            {/* Confirmation Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-semibold mb-4">Are you sure?</h2>
                <p className="text-gray-700 mb-6">
                    This action will remove your tutor profile and pause your subscription.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleCancel}
                        disabled={loading}
                        className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition ${loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Cancelling...' : 'Yes, Cancel Subscription'}
                    </button>

                    <button
                        onClick={() => router.push('/tutor')}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
                    >
                        Keep My Subscription
                    </button>
                </div>
            </div>
        </div>
    );
}
