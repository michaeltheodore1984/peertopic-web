// 'use client';
// import { useEffect, useState } from 'react';

// interface Tutor {
//     id: number;
//     hourlyRate: number;
//     lessonsLeft: number;
//     earnings: number;
// }

// interface AccountFormProps {
//     tutor: Tutor;
// }

// export default function Subscription({ tutor }: AccountFormProps) {
//     const [subscribed, setSubscribed] = useState(false);

//     // After fetching user
//     useEffect(() => {
        
//     }, [tutor]);

//     return (
//         <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
//         <div>
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Subscription</h2>
//             <p className="text-3xl font-bold text-green-600">{tutor.lessonsLeft.toString()}</p>
//             <p className="text-sm text-gray-500 mt-1">Lessons left</p>
//         </div>

//         {!subscribed ?
//             <button disabled className="mt-6 w-full bg-gray-300 text-gray-400 py-2 rounded-lg">
//                 Subscribe
//             </button>
//             : <button disabled className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
//                 Cancel
//             </button>
//         }
//     </div>
//     );
// }

