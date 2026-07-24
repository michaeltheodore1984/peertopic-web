'use client';

import { Tutor } from '@/lib/models';

interface TutorProps {
    tutor: Tutor;
}

const TutorSection = ({ tutor }: TutorProps) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    function handleSubmit() {

    }


    return (
        <div className="bg-gray-100 text-gray-800">
            {/* Top Navigation Bar */}
            <main className='p-6 max-w-2xl mx-auto'>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Become a tutor</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                            Hourly rate
                        </label>
                        <input
                            type="text"
                            name="hourlyRate"
                            id="firstName"
                            value='0'
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                       Become a tutor
                    </button>
                </form>
            </main>

        </div>

    );
};

export default TutorSection;
