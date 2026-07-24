import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInPage from "@/app/signin/page";
import { Tutor } from "@/models/Tutor";
import EditTutorProfilePage from "./EditTutorPage";
import { Topic } from "@/lib/models";
import { notFound } from "next/navigation";
import { getTutorTimeOff } from "@/lib/actions";

export default async function EditTutor() {
    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page="/tutor/edit" />;

    const userId = session?.user.id;

    const tutor = await Tutor.findOne({ where: { id: userId }, include: { model: Topic, as: 'topics' } });

    if (!tutor) return notFound();

    const tutorTimeOff = await getTutorTimeOff(tutor.id);

    // console.log(tutorTimeOff.payload)

    const list = tutorTimeOff.payload;

    // console.log(list)

    const daysOff = tutorTimeOff.payload?.map(d => new Date(d)) ?? [];
    // console.log(daysOff)
    // const daysOffDates = daysOff.map(d => new Date(d).toDateString());
    // console.log(daysOffDates)
    const daysOffDates = ['2025-11-28'];
    const daysOff2: Date[] = daysOffDates!.map(d => {
        const [year, month, day] = d.split('-').map(Number);
        return new Date(year, month - 1, day); // JS months are 0-indexed
    });
    // console.log(daysOffDates)

    // const dateString = (new Date('2025-11-26')).getTime();
    const dateString = '2025-11-26';
    const [y, m, d] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));

    // console.log(date.getTime())

    // const dateStrings = ['2025-11-26', '2025-11-28'];

    // console.log(list)
    // const dateStrings = list;

    const dateStrings = list?.map(item => String(item));

    const dates = dateStrings?.map(str => {
        const [y, m, d] = str.split('-').map(Number);
        return new Date(Date.UTC(y, m - 1, d)).getTime(); // always UTC midnight
    });

    return (
        <div data-testid='tutor-edit-pw' className="mx-auto px-6 text-gray-800 bg-gray-200">
            <main className="max-w-3xl mx-auto">
                <EditTutorProfilePage tutor={tutor?.toJSON()} myDate={date} daysOff={dates} />
            </main>
        </div>
    );
}
