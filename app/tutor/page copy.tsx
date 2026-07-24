// 'use client'

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Tutor, User } from "@/lib/models";

import { RoleToggleTutor } from "./toggle";
import Link from "next/link";

// import { User } from "@/lib/models";
// import { getServerSession } from "next-auth/next";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { authOptions } from "../api/auth/[...nextauth]/route";

// type Lesson = {
//     id: number;
//     topic: string;
//     student: string;
//     date: string;
//     duration: string;
//     status: "proposed" | "confirmed";
// };

// export default async  function TutorDashboard() {
//     const session = await getServerSession(authOptions);

//     if(!session) return <p>Unauthorized</p>;

//     const userId = session?.user.id;

//     const user = await User.findByPk(userId);

//     if (!user) return <p>No user found</p>;

//     const [showHistory, setShowHistory] = useState(false);
//     const [showEditRate, setShowEditRate] = useState(false);
//     const [showTopicsModal, setShowTopicsModal] = useState(false);
//     const [hourlyRate, setHourlyRate] = useState(0);
//     const [topics, setTopics] = useState(["React", "TypeScript", "Next.js"]);

//     return (
//         <div className="min-h-screen bg-gray-50 py-10 px-6">
//             <div className="flex items-center justify-between pb-4">
//                 <h1 className="text-2xl font-bold text-gray-900">Tutor Dashboard</h1>
//                 <RoleToggleTutor user={user} />
//             </div>

//             {/* Cards Grid */}
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                 {/* Card 1: Total Lessons Given */}
//                 <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
//                     <div>
//                         <h2 className="text-lg font-semibold text-gray-700 mb-2">Total income</h2>
//                         <p className="text-2xl font-bold text-indigo-600">$600</p>
//                         <p className="text-sm text-gray-500 mt-1">Across all your topics</p>
//                     </div>
//                     <div>
//                         <p className="text-2xl font-bold text-indigo-600">42</p>
//                         <p className="text-sm text-gray-500 mt-1">Lessons given</p>
//                     </div>

//                 </div>

//                 {/* Card 2: Hourly Rate */}
//                 <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
//                     <div>
//                         <h2 className="text-lg font-semibold text-gray-700 mb-2">My Hourly Rate</h2>
//                         <p className="text-2xl font-bold text-green-600">{hourlyRate == 0 ? 'Free' : "$" + hourlyRate + '/hr'}</p>
//                         <p className="text-sm text-gray-500 mt-1">Adjust your rate anytime</p>
//                     </div>
//                     <button onClick={() => setShowEditRate(true)} className="mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
//                         Edit Rate
//                     </button>
//                 </div>

//                 {/* Card 3: My Topics */}
//                 <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
//                     <div>
//                         <h2 className="text-lg font-semibold text-gray-700 mb-2">My Topics</h2>
//                         <ul className="text-gray-600 text-sm space-y-1">
//                             {topics.map(topic => <li key={topic}>{topic}</li>)}
//                         </ul>
//                     </div>
//                     <button onClick={() => setShowTopicsModal(true)} className="mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
//                         Manage Topics
//                     </button>
//                 </div>
//                 {/* Card 4: Subscription */}
//                 <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
//                     <div>
//                         <h2 className="text-lg font-semibold text-gray-700 mb-2">Subscription</h2>
//                         <p className="text-2xl font-bold text-green-600">2</p>
//                         <p className="text-sm text-gray-500 mt-1">Lessons left</p>
//                     </div>
//                     <button disabled className="mt-6 w-full bg-gray-300 text-gray-400 py-2 rounded-lg">
//                         Subscribe
//                     </button>
//                 </div>

//             </div>

//             <ManageScheduleCard />

//             {showHistory && (<MyHistory setShowHistory={setShowHistory} />)}

//             {showEditRate && (
//                 <EditRateModal
//                     currentRate={hourlyRate}
//                     setShowEditRate={setShowEditRate}
//                     setHourlyRate={setHourlyRate}
//                 />
//             )}

//             {showTopicsModal && (
//                 <ManageTopicsModal
//                     topics={topics}
//                     setTopics={setTopics}
//                     setShowTopicsModal={setShowTopicsModal}
//                 />
//             )}
//         </div>
//     );
// }

// type LessonHistoryProps = {
//     setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
// };

// function MyHistory({ setShowHistory }: LessonHistoryProps) {

//     const lessonHistory: Lesson[] = [
//         { id: 1, topic: "JavaScript", student: "Liam", date: "Oct 15, 2025", duration: "1 hr", status: 'confirmed' },
//         { id: 2, topic: "React", student: "Sophia", date: "Oct 20, 2025", duration: "1.5 hr", status: 'confirmed' },
//         { id: 3, topic: "Node.js", student: "Noah", date: "Oct 22, 2025", duration: "1 hr", status: 'confirmed' },
//     ];

//     return <>
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//             <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6 relative">
//                 <h2 className="text-xl font-bold mb-4 text-gray-900">Lesson History</h2>
//                 <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
//                     {lessonHistory.map((lesson) => (
//                         <li key={lesson.id} className="py-3">
//                             <p className="text-sm text-gray-800 font-medium">
//                                 {lesson.topic} with {lesson.student}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                                 {lesson.date} • {lesson.duration}
//                             </p>
//                         </li>
//                     ))}
//                 </ul>
//                 <button
//                     onClick={() => setShowHistory(false)}
//                     className="mt-6 bg-gray-800 text-white w-full py-2 rounded-lg hover:bg-gray-900 transition"
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     </>
// }

// type EditRateModalProps = {
//     currentRate: number;
//     setShowEditRate: React.Dispatch<React.SetStateAction<boolean>>;
//     setHourlyRate: React.Dispatch<React.SetStateAction<number>>;
// };

// function EditRateModal({
//     currentRate,
//     setShowEditRate,
//     setHourlyRate,
// }: EditRateModalProps) {
//     const [rate, setRate] = useState<string>(String(currentRate));

//     const handleSave = () => {
//         const parsed = parseFloat(rate);
//         if (!isNaN(parsed)) {
//             setHourlyRate(parsed);
//         }
//         setShowEditRate(false);
//     };

//     return (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6">
//                 <h2 className="text-xl font-semibold mb-4 text-[#7c5cff]">Edit Hourly Rate</h2>

//                 <label className="block text-gray-600 text-sm mb-1">
//                     Enter your hourly rate ($)
//                 </label>
//                 <input
//                     type="number"
//                     min={0}
//                     value={rate}
//                     onChange={(e) => setRate(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />

//                 <div className="flex justify-end gap-3">
//                     <button
//                         onClick={() => setShowEditRate(false)}
//                         className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleSave}
//                         className="px-4 py-2 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
//                     >
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// type ManageTopicsModalProps = {
//     topics: string[];
//     setTopics: React.Dispatch<React.SetStateAction<string[]>>;
//     setShowTopicsModal: React.Dispatch<React.SetStateAction<boolean>>;
// };

// function ManageTopicsModal({
//     topics,
//     setTopics,
//     setShowTopicsModal,
// }: ManageTopicsModalProps) {
//     const [newTopic, setNewTopic] = useState("");

//     const handleAdd = () => {
//         const trimmed = newTopic.trim();
//         if (trimmed && !topics.includes(trimmed)) {
//             setTopics([...topics, trimmed]);
//             setNewTopic("");
//         }
//     };

//     const handleRemove = (topicToRemove: string) => {
//         setTopics(topics.filter((topic) => topic !== topicToRemove));
//     };

//     return (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-lg p-6">
//                 <h2 className="text-xl font-semibold mb-4 text-[#7c5cff]">Manage Your Topics</h2>

//                 {/* List of topics */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                     {topics.length > 0 ? (
//                         topics.map((topic, i) => (
//                             <div
//                                 key={i}
//                                 className="flex items-center bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-sm"
//                             >
//                                 {topic}
//                                 <button
//                                     onClick={() => handleRemove(topic)}
//                                     className="ml-2 text-xs text-red-500 hover:text-red-700"
//                                     aria-label={`Remove ${topic}`}
//                                 >
//                                     ✕
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500 text-sm">No topics added yet.</p>
//                     )}
//                 </div>

//                 {/* Add new topic */}
//                 <div className="flex items-center gap-2 mb-4">
//                     <input
//                         type="text"
//                         placeholder="Add new topic"
//                         value={newTopic}
//                         onChange={(e) => setNewTopic(e.target.value)}
//                         className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
//                     />
//                 </div>
//                 <div className="flex justify-between">
//                     <button
//                         onClick={handleAdd}
//                         className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
//                     >
//                         Add
//                     </button>
//                     {/* Footer actions */}

//                     <button
//                         onClick={() => setShowTopicsModal(false)}
//                         className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function ManageScheduleCard() {
//     const [lessons, setLessons] = useState<Lesson[]>([
//         { id: 1, student: "Annie", duration: "1 hour", topic: 'Java', date: 'October 25, 2025', status: "confirmed" },
//         { id: 2, student: "John", duration: '2 hours', topic: 'Html', date: "Oct 31, 5:00 PM", status: "proposed" },
//     ]);

//     const [modalInfo, setModalInfo] = useState<{
//         isOpen: boolean;
//         type: "confirm" | "cancel" | null;
//         lesson: Lesson | null;
//     }>({ isOpen: false, type: null, lesson: null });


//     const onConfirmModal = () => {
//         if (modalInfo.type === "confirm" && modalInfo.lesson!.id !== null) {
//             setLessons(
//                 lessons.map((lesson) =>
//                     lesson.id === modalInfo.lesson!.id ? { ...lesson, status: "confirmed" } : lesson
//                 )
//             );
//         } else if (modalInfo.type === "cancel" && modalInfo.lesson!.id !== null) {
//             setLessons(lessons.filter((lesson) => lesson.id !== modalInfo.lesson!.id));
//         }
//         setModalInfo({ isOpen: false, type: null, lesson: null });
//     };

//     const onCancelModal = () => {
//         setModalInfo({ isOpen: false, type: null, lesson: null });
//     };

//     const handleAction = (type: "confirm" | "cancel", lesson: Lesson) => {
//         setModalInfo({ isOpen: true, type, lesson });
//     };

//     return (
//         <div className="w-full mt-6">
//             <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4 w-full md:w-80">
//                 <h2 className="text-lg font-semibold text-gray-800">Manage Schedule</h2>

//                 {lessons.length === 0 && (
//                     <p className="text-gray-500">No upcoming lessons</p>
//                 )}

//                 {lessons.map((lesson) => (
//                     <div
//                         key={lesson.id}
//                         className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
//                     >
//                         <div>
//                             <p className="font-medium text-gray-700">{lesson.student}</p>
//                             <p className="text-sm text-gray-500">{lesson.date}</p>
//                             <p
//                                 className={`text-xs font-semibold mt-1 ${lesson.status === "confirmed"
//                                     ? "text-green-600"
//                                     : "text-yellow-600"
//                                     }`}
//                             >
//                                 {lesson.status === "confirmed" ? "Confirmed" : "Proposed"}
//                             </p>
//                         </div>
//                         <div className="flex flex-col gap-2">
//                             {lesson.status === "proposed" && (
//                                 <button
//                                     className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
//                                     onClick={() => handleAction("confirm", lesson)}
//                                 >
//                                     Confirm
//                                 </button>
//                             )}
//                             <button
//                                 className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
//                                 onClick={() => handleAction("cancel", lesson)}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {/* Modal */}
//             <ConfirmModal
//                 isOpen={modalInfo.isOpen}
//                 title={
//                     modalInfo.type === "confirm" ? "Confirm Lesson?" : "Cancel Lesson?"
//                 }
//                 message={
//                     modalInfo.lesson
//                         ? modalInfo.type === "confirm"
//                             ? `Confirm the lesson with ${modalInfo.lesson.student} on ${modalInfo.lesson.date}?`
//                             : `Are you sure you want to cancel the lesson with ${modalInfo.lesson.student} on ${modalInfo.lesson.date}?`
//                         : ""
//                 }
//                 onConfirm={onConfirmModal}
//                 onCancel={onCancelModal}
//             />
//         </div>
//     );
// }

// interface ConfirmModalProps {
//     isOpen: boolean;
//     title: string;
//     message: string;
//     onConfirm: () => void;
//     onCancel: () => void;
// }

// export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white rounded-lg shadow-lg w-80 p-6 flex flex-col gap-4">
//                 <h2 className="text-xl font-semibold text-center text-black">{title}</h2>
//                 <p className="text-center text-gray-700 leading-relaxed">
//                     {message.split(" at ").map((part, i) =>
//                         i === 0 ? (
//                             <span key={i} className="font-medium">{part}</span>
//                         ) : (
//                             <span key={i} className="block mt-1 text-sm text-gray-500">{`at ${part}`}</span>
//                         )
//                     )}
//                 </p>
//                 <div className="flex justify-between mt-4 gap-4">
//                     <button
//                         className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//                         onClick={onCancel}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                         onClick={onConfirm}
//                     >
//                         Confirm
//                     </button>
//                 </div>
//             </div>
//         </div>

//     );
// }

// interface RoleProps {
//     user: User;
// }

// function RoleToggleTutor({user}: RoleProps) {

//     const router = useRouter();

//     const handleToggle = () => {
//         router.replace('/learner');
//     };
//     return (
//         <div className="flex items-center space-x-4">
//             <span className=" text-gray-700 text-lg font-bold">Hi, Tutor</span>
//             <button
//                 className="relative w-18 h-7 rounded-full transition-colors bg-green-500"
//                 onClick={handleToggle}
//             >
//                 <span
//                     className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md translate translate-x-11"
//                 />
//             </button>
//             <span className="font-medium text-gray-700 text-lg">Tutor</span>
//         </div>
//     );
// }

interface UserWithTutor extends User {
    tutorProfile?: Tutor | null;
}

export default async function TutorDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) return <p>Unauthorized</p>;

    const userId = session?.user.id;

    const user: UserWithTutor | null = await User.findByPk(userId, {
        include: { model: Tutor, as: "tutorProfile" }
    });

    if (!user) return <p>No user found</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-6">
            <div className="flex items-center justify-between pb-4">
                <h1 className="text-xl font-bold text-gray-900">Tutor Dashboard</h1>
                <RoleToggleTutor user={user.toJSON()} />
            </div>
            {!user.tutorProfile ?
                <div className="w-full bg-green-300 border border-green-500 rounded-md p-4 flex flex-col sm:flex-row items-center justify-between text-gray-900 shadow-md">
                    <p className="text-lg font-medium mb-2 sm:mb-0">
                        You’re currently <span className="font-semibold">not a tutor</span>.
                    </p>
                    <Link href='/onboarding'>
                        <button
                            className="bg-white text-green-700 font-semibold px-4 py-2 rounded-md shadow hover:bg-green-100 transition"
                        >
                            Become a Tutor
                        </button>
                    </Link>
                </div> : <span>tutor</span>}
        </div>
    );
}

