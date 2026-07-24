// 'use client';

// import { useState } from "react";
// import HourlyRateForm from "./HourlyRateForm";
// import TopicForm from "./TopicForm";
// import Subscription from "./Subscription";
// import { Topic } from "@/lib/models";
// import TotalLessons from "./TotalLessons";
// import { useRouter } from "next/navigation";

// interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     tutorProfile: Tutor;
// }

// interface Tutor {
//     id: number;
//     hourlyRate: number;
//     lessonsLeft: number;
//     earnings: number;
//     topics: Topic[];
// }

// interface AccountProps {
//     user: User;
// }

// export default function AccountHeader({ user }: AccountProps) {
//     const [role, setRole] = useState<"learner" | "tutor">("learner");

//     return (
//         <div>
//             <div className="flex flex-col py-4 sm:flex-row sm:items-center sm:justify-between space-y-4 px-6 sm:space-y-0">
//                 <h1 className="text-2xl font-bold text-gray-900">PeerTopic
//                     <span className="ml-2 text-green-600">Tutor</span></h1>
//                 <RoleToggleTutor tutor={user} />
//             </div>
//             <div className="mt-4">
//                 <TutorDashboard user={user} />

//             </div>

//         </div>


//     );
// }

// interface RoleProps {
//     tutor: User;
// }

// function RoleToggleTutor({ tutor }: RoleProps) {

//     const router = useRouter();

//     const handleToggle = () => {
//         router.replace('/learner');
//     };
//     return (
//         <div className="flex items-center space-x-4">
//             <span className=" text-gray-700 text-lg font-bold">Hi, {tutor.firstName}</span>
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



// function TutorDashboard({ user }: AccountProps) {
//     return (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//             <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">

//                 <h2 className="text-lg font-semibold text-gray-700 mb-2">Welcome, {user.firstName}</h2>
//                 <p className="text-3xl font-bold text-indigo-600">${user.tutorProfile.earnings}</p>
//                 <p className="text-sm text-gray-500 mt-1">Earnings</p>
//                 <TotalLessons tutor={user.tutorProfile} />

//             </div>

//             <HourlyRateForm tutor={user.tutorProfile} />
//             <TopicForm tutor={user.tutorProfile} myTopics={user.tutorProfile.topics} />
//             <Subscription tutor={user.tutorProfile} />
//             <ManageScheduleCard />
//         </div>
//     );
// }
// function ManageScheduleCard() {
//     /*   const [lessons, setLessons] = useState<Lesson[]>([
//           { id: 1, student: "Annie", duration: "1 hour", topic: 'Java', date: 'October 25, 2025', status: "confirmed" },
//           { id: 2, student: "John", duration: '2 hours', topic: 'Html', date: "Oct 31, 5:00 PM", status: "proposed" },
//       ]);
  
//       const [modalInfo, setModalInfo] = useState<{
//           isOpen: boolean;
//           type: "confirm" | "cancel" | null;
//           lesson: Lesson | null;
//       }>({ isOpen: false, type: null, lesson: null }); */


//     /*  const onConfirmModal = () => {
//          if (modalInfo.type === "confirm" && modalInfo.lesson!.id !== null) {
//              setLessons(
//                  lessons.map((lesson) =>
//                      lesson.id === modalInfo.lesson!.id ? { ...lesson, status: "confirmed" } : lesson
//                  )
//              );
//          } else if (modalInfo.type === "cancel" && modalInfo.lesson!.id !== null) {
//              setLessons(lessons.filter((lesson) => lesson.id !== modalInfo.lesson!.id));
//          }
//          setModalInfo({ isOpen: false, type: null, lesson: null });
//      };
 
//      const onCancelModal = () => {
//          setModalInfo({ isOpen: false, type: null, lesson: null });
//      };
 
//      const handleAction = (type: "confirm" | "cancel", lesson: Lesson) => {
//          setModalInfo({ isOpen: true, type, lesson });
//      }; */

//     return (
//         <div className="w-full bg-white shadow rounded-lg p-6 mt-6">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Schedule</h2>

//             <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4">
//                 {/* {lessons.map((lesson) => ( */}
//                 <div
//                     // key={lesson.id}
//                     className="flex flex-col justify-between bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100 w-full lg:w-[48%] xl:w-[32%] hover:shadow-md transition-shadow"
//                 >
//                     <div className="mb-3">
//                         {/* <div className="flex justify-between">
//                                     <p className="text-lg font-semibold text-gray-900">
//                                         {lesson.student}
//                                     </p>
//                                     <p
//                                         className={`text-xs font-semibold mt-1 ${lesson.status === "confirmed"
//                                             ? "text-green-600"
//                                             : "text-yellow-600"
//                                             }`}
//                                     >
//                                         {lesson.status === "confirmed" ? "Confirmed" : "Proposed"}
//                                     </p>
//                                 </div> */}

//                         {/* <p className="text-sm text-gray-600">{lesson.topic}</p> */}
//                         <p className="text-sm text-gray-500 mt-1">
//                             {/* {new Date(lesson.date).toLocaleString()} */}
//                         </p>
//                     </div>

//                     <div className="flex mt-2 space-x-6">
//                         {/* {lesson.status !== 'confirmed' && ( */}
//                         <button
//                             // onClick={() => handleAction('confirm', lesson)}
//                             className="px-4 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
//                         >
//                             Confirm
//                         </button>{/* )} */}
//                         <button
//                             // onClick={() => handleAction('cancel', lesson)}
//                             className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//                 {/* ))} */}
//             </div>
//             {/* <ConfirmModal
//                     isOpen={modalInfo.isOpen}
//                     title={
//                         modalInfo.type === "confirm" ? "Confirm Lesson?" : "Cancel Lesson?"
//                     }
//                     message={
//                         modalInfo.lesson
//                             ? modalInfo.type === "confirm"
//                                 ? `Confirm the lesson with ${modalInfo.lesson.student} on ${modalInfo.lesson.date}?`
//                                 : `Are you sure you want to cancel the lesson with ${modalInfo.lesson.student} on ${modalInfo.lesson.date}?`
//                             : ""
//                     }
//                     onConfirm={onConfirmModal}
//                     onCancel={onCancelModal}
//                 /> */}
//         </div>
//     );
// }
