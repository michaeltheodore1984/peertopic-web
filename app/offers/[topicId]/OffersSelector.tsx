// // components/TutorTopicSelector.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { Topic, Tutor } from "@/lib/models";

// interface Props {
//   tutors: Tutor[];
// }

// export default function OffersSelector({ tutors }: Props) {

//   const router = useRouter();

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {tutors.map((tutor: any) => (
//         <div
//           key={tutor.id}
//           className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2"
//         >
//           <div className="flex items-center gap-4">
//             <img
//               // src={tutor.avatar}
//               alt={tutor.id}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//             <div>
//               <h2 className="text-lg font-semibold text-gray-900">{tutor.user.firstName} {tutor.user.lastName}</h2>
//               <p className="text-lg text-gray-500">
//                 ${tutor.hourlyRate}/hr
//               </p>
//             </div>
//           </div>

//           <button
//             className="mt-auto px-4 py-2 bg-[#d4b483] text-white rounded-full font-medium hover:bg-[#bfa06c] transition"
//             onClick={() => router.push(`/booking?tutor=${encodeURIComponent(tutor.id)}`)}
//           >
//             Book
//           </button>
//         </div>
//       ))}

//     </div>
//   );
// }

// components/TutorTopicSelector.tsx
"use client";

import { useRouter } from "next/navigation";
import { Tutor } from "@/lib/models";


interface Props {
  tutors: Tutor[];
}

export default function OffersSelector({ tutors }: Props) {

  const router = useRouter();

  function handleBook(tutor: Tutor) {
    router.push(`/tutor/booking/${tutor.id}`)
  }

  return (
    <main className="flex flex-col items-start space-y-4 md:space-y-6">
      {tutors.map((tutor: Tutor) => (
        <div key={tutor.id} className="bg-white rounded-xl shadow-md w-full md:w-auto">
          <div className="flex bg-white rounded-xl p-4">
            <img
              src={tutor.user.profileImage.url}
              alt="avatar"
              className="w-32 h-32 rounded-xl border border-gray-400 object-cover"
            />
            <section className="ml-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{tutor.user?.firstName}</h2>
              <p className="text-xl font-bold text-green-600">{tutor.hourlyRate == 0 || tutor.hourlyRate == 0 ? 'Free' : "$" + tutor.hourlyRate + '/hr'}</p>
              <p className="text-sm text-gray-500 mt-1"></p>

              <button onClick={() => handleBook(tutor)} className="mt-6 bg-green-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-green-700 transition">
                Book lesson
              </button>

            </section>
          </div>
          <p className="m-4 text-gray-800">{tutor.bio}</p>
        </div>))}


    </main>

  );
}

