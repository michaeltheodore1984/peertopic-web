// 'use client';

// import { Lesson, Tutor, User } from "@/lib/models";

// interface TutorWithLessons extends Tutor {
//     Lessons: Lesson[];
// }

// interface UserWithTutor extends User {
//     tutorProfile?: TutorWithLessons | null;
// }

// interface TotalLessonsProps {
//     user: UserWithTutor;
// }

// export default function TotalLessons({ user }: TotalLessonsProps) {
//     return (

//         <section className="flex space-x-4">
//             <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

//                 <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Earnings</h2>
//                 <p className="text-2xl font-bold text-indigo-600">${user.tutorProfile?.earnings}</p>
//             </section>
//             <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Lessons</h2>
//                 <p className="text-2xl font-bold text-indigo-600">{user.tutorProfile!.Lessons.length}</p>
//                 <p className="text-sm text-gray-500 mt-1">Across all your topics</p>
//             </section>
//         </section>

//     );
// }