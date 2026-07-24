'use client';
import { useEffect, useState } from 'react';
import { Tutor, User } from '@/lib/models';
import { updateHourlyRate } from '@/lib/actions';


interface UserWithTutor extends User {
  tutorProfile?: Tutor | null;
}

interface HourlyRateProps {
  user: UserWithTutor;
}

export default function HourlyRateForm({ user }: HourlyRateProps) {
  const [showEditRate, setShowEditRate] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(0);

  // After fetching user
  useEffect(() => {
    setHourlyRate(user.tutorProfile!.hourlyRate);
  }, [user]);

  function saveHourlyRate(updatedRate: string) {
    updateHourlyRate(user.tutorProfile!.id, Number(updatedRate));
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Hourly Rate</h2>
        <p className="text-2xl font-bold text-green-600">{hourlyRate == 0 || hourlyRate == 0 ? 'Free' : "$" + hourlyRate + '/hr'}</p>
        <p className="text-sm text-gray-500 mt-1">Adjust your rate anytime</p>
      
      <button onClick={() => setShowEditRate(true)} className="mt-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
        Edit Rate
      </button>
      {showEditRate && (
       <EditRateModal
          rate={hourlyRate}
          setHourlyRate={setHourlyRate}
          setShowEditRate={setShowEditRate}
          saveHourlyRate={saveHourlyRate}
        /> 
      )}
    </section>
  );
}

interface EditRateProps {
  rate: number;
  setHourlyRate: React.Dispatch<React.SetStateAction<number>>;
  setShowEditRate: React.Dispatch<React.SetStateAction<boolean>>;
  saveHourlyRate: (updatedRate: string) => void;
}

function EditRateModal({rate, saveHourlyRate, setShowEditRate, setHourlyRate}: EditRateProps) {
  const [edited, setEdited] = useState(rate.toString());

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6">
             <h2 className="text-xl font-semibold mb-4 text-[#7c5cff]">Edit Hourly Rate</h2>
    
             <label className="block text-gray-600 text-sm mb-1">
            Enter your hourly rate ($)
             </label>
            <input
              type="number"
              min={0}
              value={edited}
              onChange={(e) => setEdited(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
    
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditRate(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => { saveHourlyRate(edited); setShowEditRate(false); setHourlyRate(Number(edited))}}
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
  );
}

// type EditRateModalProps = {
//   tutor: Tutor;
//   currentRate: number;
//   setShowEditRate: React.Dispatch<React.SetStateAction<boolean>>;
//   setHourlyRate: React.Dispatch<React.SetStateAction<string>>;
// };

// function EditRateModal({
//   tutor,
//   currentRate,
//   setShowEditRate,
//   setHourlyRate,
// }: EditRateModalProps) {
//   const [rate, setRate] = useState(currentRate);
//   const router = useRouter();

//   const handleSave = () => {
   
//       setHourlyRate(rate);
//       setRate(rate);
//       updateHourlyRate(tutor.id, Number(rate));
//     setShowEditRate(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6">
//         <h2 className="text-xl font-semibold mb-4 text-[#7c5cff]">Edit Hourly Rate</h2>

//         <label className="block text-gray-600 text-sm mb-1">
//           Enter your hourly rate ($)
//         </label>
//         <input
//           type="number"
//           min={0}
//           value={rate}
//           onChange={(e) => setRate(e.target.value)}
//           className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />

//         <div className="flex justify-end gap-3">
//           <button
//             onClick={() => setShowEditRate(false)}
//             className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }