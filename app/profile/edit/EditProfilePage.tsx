'use client'

import { User } from "@/lib/models";
import Link from "next/link";
import ProfileAvatarUploader from "./AvatarUploader";
import { useState } from "react";
import { saveProfile } from "@/lib/actions";
import toast, { Toaster } from 'react-hot-toast';

interface EditProfilePageProps {
    user: User;
}

export default function EditProfilePage({ user }: EditProfilePageProps) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState<string[]>([]);


    async function handleSave() {

        const payload = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
        };
        const result = await saveProfile(user.id, payload);
        if (!result.success) {
            const messages = result.errors.join(", ");
            setErrors(result.errors);
        } else {
            setErrors([]);
            toast.success('Saved successfully!')
        }
    }

    return (
        <div data-testid="profile-edit-pw" className="mx-auto py-10 px-6 text-gray-800 bg-gray-200">
            <main className="max-w-3xl mx-auto">
                {/* Header */}
                <section className="mb-10">
                    <h1 className="text-3xl font-bold mb-1">Edit Profile</h1>
                    <p className="text-gray-500 text-sm">
                        Update your personal information.
                    </p>
                </section>

                <ProfileAvatarUploader user={user} />


                {/* Name */}
                <div className="my-8">
                    <label className="block text-sm font-medium mb-2">
                        First Name
                    </label>
                    <input
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName ?? ''}
                        className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800"
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium mb-2">
                        Last Name
                    </label>
                    <input
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName ?? ''}
                        className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800"
                    />
                </div>

                {/* Email */}
                <div className="mb-8">
                    <label className="block text-sm font-medium mb-2">
                        Email <span className="text-xs bg-gray-800 rounded-full text-white px-2 py-1">PRIVATE</span>
                    </label>
                    <input
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email ?? ''}
                        className="w-full border border-gray-300 bg-gray-100 rounded px-3 py-2 text-gray-600"
                    />
                </div>

                {/* Avatar */}
                <div className="mb-8">
                    <label className="block text-sm font-medium mb-2">
                        Avatar URL
                    </label>
                    <input
                        disabled
                        readOnly
                        name="image"
                        value={user?.profileImage?.url ?? "none"}
                        className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800"
                    />
                </div>

                {errors.length > 0 && (
                    <ul className="text-red-500 mb-8">
                        {errors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                        ))}
                    </ul>
                )}

                {/* Save button */}
                <div className="flex gap-4">
                    <button
                        data-testid='save-profile-button-pw'
                        onClick={handleSave}
                        className="px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                        Save Changes
                    </button>

                    <Link
                        href="/profile"
                        className="px-5 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </Link>
                </div>
                <Toaster
                    toastOptions={{
                        duration: 4000, // 4 seconds
                        style: {
                            background: '#333',
                            color: '#fff',
                            border: '1px solid #4ade80', // green border
                            borderRadius: '8px',
                            padding: '16px',
                            fontWeight: 'bold',
                        },
                        success: {
                            style: {
                                background: '#4ade80', // Tailwind green-400
                                color: '#000',
                            },
                        },
                        error: {
                            style: {
                                background: '#f87171', // Tailwind red-400
                                color: '#000',
                            },
                        },
                    }}
                />
            </main>
        </div>
    );
}