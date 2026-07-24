"use client";

import Link from "next/link";
import { useState } from "react";

type Lesson = {
    id: number;
    topic: string;
    student: string;
    date: string;
    duration: string;
    status: "proposed" | "confirmed";
};

export default function PeerDashboard() {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 px-6">

            {/* Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1: Total Lessons Taken */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Lessons Taken</h2>
                        <p className="text-3xl font-bold text-indigo-600">42</p>
                        <p className="text-sm text-gray-500 mt-1">Across all your topics</p>
                    </div>
                </div>

                {/* Card 2: Explore topics */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Explore topics</h2>
                        {/* <p className="text-3xl font-bold text-green-600">{'$' + hourlyRate}</p> */}
                        <p className="text-sm text-gray-500 mt-1">Learn everything</p>
                    </div>
                    <Link href='/explore'>
                        <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                            Explore
                        </button>
                    </Link>
                </div>
            </div>

            <ManageScheduleCard />

        </div>
    );
}

function ManageScheduleCard() {
    const [lessons, setLessons] = useState<Lesson[]>([
        { id: 1, student: "Annie", duration: "1 hour", topic: 'Java', date: 'October 25, 2025', status: "confirmed" },
        { id: 2, student: "John", duration: '2 hours', topic: 'Html', date: "Oct 31, 5:00 PM", status: "proposed" },
    ]);

    const [modalInfo, setModalInfo] = useState<{
        isOpen: boolean;
        type: "confirm" | "cancel" | null;
        lesson: Lesson | null;
    }>({ isOpen: false, type: null, lesson: null });


    const onConfirmModal = () => {
        if (modalInfo.type === "confirm" && modalInfo.lesson!.id !== null) {
            setLessons(
                lessons.map((lesson) =>
                    lesson.id === modalInfo.lesson!.id ? { ...lesson, status: "confirmed" } : lesson
                )
            );
        } else if (modalInfo.type === "cancel" && modalInfo.lesson!.id !== null) {
            setLessons(lessons.filter((lesson) => lesson.id !== modalInfo.lesson!.id));
        }
        setModalInfo({ isOpen: false, type: null, lesson: null });
    };

    const onCancelModal = () => {
        setModalInfo({ isOpen: false, type: null, lesson: null });
    };

    const handleAction = (type: "confirm" | "cancel", lesson: Lesson) => {
        setModalInfo({ isOpen: true, type, lesson });
    };

    return (
        <div className="w-full bg-white shadow rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming lessons</h2>

            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4">
                {lessons.map((lesson) => (
                    <div
                        key={lesson.id}
                        className="flex flex-col justify-between bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100 w-full lg:w-[48%] xl:w-[32%] hover:shadow-md transition-shadow"
                    >
                        <div className="mb-3">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold text-gray-900">
                                    {lesson.student}
                                </p>
                                <p
                                    className={`text-xs font-semibold mt-1 ${lesson.status === "confirmed"
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                        }`}
                                >
                                    {lesson.status === "confirmed" ? "Confirmed" : "Proposed"}
                                </p>
                            </div>

                            <p className="text-sm text-gray-600">{lesson.topic}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {new Date(lesson.date).toLocaleString()}
                            </p>
                        </div>

                        <div className="flex mt-2 space-x-6">
                            {lesson.status !== 'confirmed' && (
                                <button
                                    onClick={() => handleAction('confirm', lesson)}
                                    className="px-4 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                                >
                                    Confirm
                                </button>)}
                            <button
                                onClick={() => handleAction('cancel', lesson)}
                                className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmModal
                isOpen={modalInfo.isOpen}
                title={
                    modalInfo.type === "confirm" ? "Confirm Lesson?" : "Cancel Lesson?"
                }
                message={
                    modalInfo.lesson
                        ? modalInfo.type === "confirm"
                            ? `Confirm the lesson with ${modalInfo.lesson.student} on ${modalInfo.lesson.date}?`
                            : `Are you sure you want to cancel the lesson with ${modalInfo.lesson.student} on ${modalInfo.lesson.date}?`
                        : ""
                }
                onConfirm={onConfirmModal}
                onCancel={onCancelModal}
            />
        </div>
    );
}

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-80 p-6 flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-center text-black">{title}</h2>
                <p className="text-center text-gray-700 leading-relaxed">
                    {message.split(" at ").map((part, i) =>
                        i === 0 ? (
                            <span key={i} className="font-medium">{part}</span>
                        ) : (
                            <span key={i} className="block mt-1 text-sm text-gray-500">{`at ${part}`}</span>
                        )
                    )}
                </p>
                <div className="flex justify-between mt-4 gap-4">
                    <button
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>

    );
}