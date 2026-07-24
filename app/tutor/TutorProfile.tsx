// import { Header } from '../../util/header';
// import { User } from '@/lib/models';
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import ProfilePage from '../profile/ProfilePage';
// import TutorSection from './TutorSection';
// import SignInPage from '../signin/page';

// const TutorProfile = async () => {

//     const session = await getServerSession(authOptions);

//     if (!session) return <SignInPage />;

//     const userId = session?.user.id;

//     const userRecord = await User.findByPk(userId);

//     if (!userRecord) return <p>No user found</p>;

//     return (
//         <div className="min-h-screen bg-gray-100 text-gray-800">
//             {/* Top Navigation Bar */}
//             {/* <Header /> */}
//             <main>
//                 <ProfilePage user={userRecord.toJSON()} />
//                 <TutorSection tutor={userRecord.toJSON().tutorProfile} />
//             </main>

//         </div>

//     );
// };

// export default TutorProfile;
