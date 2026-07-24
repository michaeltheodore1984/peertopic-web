import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInPage from "@/app/signin/page";
// import EditProfilePage from "./EditProfilePage";
import { ProfileImage, User } from "@/lib/models";
import { notFound } from "next/navigation";
import EditProfilePage from "./EditProfilePage";

export default async function EditProfile() {
    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page="/profile/edit" />;

    const userId = session?.user.id;

    const userRecord = await User.findByPk(userId, { include: [{ model: ProfileImage, as: 'profileImage', attributes: ['id', 'url'] }] });

    if (!userRecord) return notFound();

    return (
        <EditProfilePage user={userRecord.toJSON()} />
    );
}


