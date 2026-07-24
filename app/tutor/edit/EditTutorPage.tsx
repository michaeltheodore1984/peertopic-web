'use client'

import Link from "next/link";
import { Tutor } from "@/lib/models";
import { Calendar } from "react-calendar";
import { useEffect, useState } from "react";
import { saveTutorProfile, setTutorTimeOff } from "@/lib/actions";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditTutorProps {
    tutor?: Tutor
    daysOff?: number[];
    myDate: Date;
}
type CalendarView = 'month' | 'year' | 'decade' | 'century';

export default function EditTutorProfilePage({ tutor, myDate, daysOff }: EditTutorProps) {
    const router = useRouter()
    const arr: String[] = [];
    const [bio, setBio] = useState('');
    // const [hourlyRate, setHourlyRate] = useState(Number(tutor?.hourlyRate));
    const [hourlyRate, setHourlyRate] = useState('');
    const [selectedDates, setSelectedDates] = useState<number[]>([])
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (tutor?.hourlyRate) {
            setHourlyRate(tutor.hourlyRate.toString());
        }
        if (tutor?.bio) {
            setBio(tutor.bio);
        }
    }, [tutor]);

    useEffect(() => {
        if (!daysOff) return;

        const nowUtc = Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate()
        );

        const cleanedList = daysOff
            .map(ts => Number(ts))
            .filter(ts => ts >= nowUtc)
            .sort((a, b) => a - b);

        setSelectedDates(cleanedList);
    }, [daysOff]);


    const tileDisabled = ({ date, view }: { date: Date; view: CalendarView }): boolean => {
        const ts = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        return selectedDates!.includes(ts);
    };

    function formatTimestampUTC(ts: number) {
        const date = new Date(ts);
        const y = date.getUTCFullYear();
        const m = String(date.getUTCMonth() + 1).padStart(2, "0"); // months are 0-indexed
        const d = String(date.getUTCDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    }

    function removeDate(removedItem: number) {
        setSelectedDates(prev => prev.filter(item => item !== removedItem));
    }

    const handleSelect = (date: Date) => {
        // Convert clicked date to UTC midnight timestamp
        const clickedUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

        const nowUtc = Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate()
        );

        // console.log(formatTimestampUTC(date.getTime()))

        setSelectedDates(prev => {
            // Remove past dates
            const filtered = prev.filter(ts => ts >= nowUtc);

            console.log(filtered);

            // Only add the clicked date if it's not already in the list
            if (!filtered.includes(clickedUtc)) {
                filtered.push(clickedUtc);
            }

            // Sort ascending if you want
            return filtered.sort((a, b) => a - b);
        });
    };


    const handleSave = async () => {
        const payload = {
            bio,
            hourlyRate: Number(hourlyRate),
            timeOffDates: selectedDates,
        };

        const res = await saveTutorProfile(tutor!.id, payload);
        if (res.success) {
            setErrors([]);
            toast.success('Saved successfully!')
        }
        else {
            const messages = res.errors.join(", ");
            setErrors(res.errors);
        }
    };

    return (
        <div className="mx-auto py-10 px-6 text-gray-800 bg-gray-200">
            <main className="max-w-3xl mx-auto">
                {/* Header */}
                <section className="mb-10">
                    <h1 className="text-3xl font-bold mb-1">Edit Tutor Profile</h1>
                    <p className="text-gray-500 text-sm">
                        Adjust your tutor information.
                    </p>
                </section>
                <section className="grid sm:grid-cols-2 items-start gap-2">
                    <div className="self-start">
                        <h1 className="font-semibold">Select days off</h1>
                        <ul data-testid="selected-dates-pw" className="mt-2">

                            {selectedDates.map((date: number) => (
                                <li key={date} className="mb-4 w-50 flex justify-between items-center gap-2 border border-gray-400 rounded p-4">
                                    <span>{formatTimestampUTC(date)}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeDate(date)}
                                        className="text-red-500 text-sm hover:underline"
                                    >
                                        <X />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div data-testid='calendar-root-pw'>
                        <Calendar
                            onClickDay={handleSelect}
                            selectRange={false}
                            minDate={new Date()}
                            tileDisabled={tileDisabled}
                            className="mb-4"
                            tileContent={({ date }) => (
                                <div data-testid={`calendar-day-${formatTimestampUTC(date.getTime())}`}></div>
                            )}
                        />
                    </div>

                </section>




                {/* Hourly Rate */}
                <div>
                    <label className="block text-xl font-semibold mb-2 mt-8">
                        Hourly Rate
                    </label>
                    <input
                        type="text"
                        name="hourlyRate"
                        min={5}
                        max={500}
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800"
                        required
                    />
                </div>


                {/* Bio */}
                <div>
                    <label className="block text-xl font-semibold mb-2 mt-8">
                        Tutor Bio
                    </label>
                    <textarea
                        name="bio"
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800"
                    />
                </div>

                <div>


                    {/* Topics */}
                    <section className="mb-10 mt-8">
                        <h2 className="text-xl font-semibold mb-3">Topics you teach</h2>

                        <div className="flex flex-wrap gap-2">
                            {tutor?.topics.map((topic) => {
                                return <span
                                    key={topic.id}
                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-200"
                                >
                                    {topic.name}
                                </span>
                            })}
                        </div>

                        <Link
                            data-testid="manage-topics-pw"
                            href="/topics"
                            className="text-blue-600 underline mt-3 inline-block"
                        >
                            Manage topics
                        </Link>
                    </section>
                </div>

                {errors.length > 0 && (
                    <ul className="text-red-500 mb-8">
                        {errors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                        ))}
                    </ul>
                )}

                {/* Save / Cancel */}
                <div className="flex gap-4 flex-col items-start">
                    <div>
                        <button onClick={handleSave}
                            data-testid="save-tutor-profile-button-pw"
                            className="px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 mr-4"
                        >
                            Save Changes
                        </button>

                        <button onClick={() => router.back()} className="px-5 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-300">
                            Go back
                        </button>
                    </div>

                    <h1 className="text-xl font-semibold mt-8">Tutor Membership</h1>
                    <button
                        onClick={() => { router.push('/cancel') }}
                        className="bg-red-500 px-5 py-2 border border-red-700 text-white rounded hover:bg-red-400">
                        Cancel Tutor Membership
                    </button>
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
