import { getServerSession } from 'next-auth/next';
import TutorPage from './TutorBookingPage';
import { Booking, Topic, Tutor, TutorTimeOff, User } from '@/lib/models';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignInPage from '@/app/signin/page';
import { notFound } from 'next/navigation';

const BookingWithTutor = async ({
    params,
}: {
    params: Promise<{ tutorId: number; }>;
}) => {
    const { tutorId } = await params;

    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page={'/tutor/booking/' + tutorId} />

    const tutor = await Tutor.findOne(
        {
            where: { userId: tutorId },
            include: [
                { model: User, as: 'user', attributes: ['id', 'firstName'] },
                { model: Topic, as: 'topics' },
                { model: TutorTimeOff, as: 'timeOff' }
            ]
        });

    if(!tutor) return notFound();

    const bookings = await Booking.findAll(
        { where: { studentId: session?.user.id } }
    );

    const studentBookings = bookings.map(item => item.start.toISOString().substring(0, item.start.toISOString().lastIndexOf(":")));

    const bookingsTutor = await Booking.findAll({
        where: { tutorId: tutorId }
    });

    const tutorBookings = bookingsTutor.map(item => item.start.toISOString().substring(0, item.start.toISOString().lastIndexOf(":")));

    return (
        <TutorPage tutor={tutor.toJSON()} session={session!} bookings={studentBookings} tutorBookings={tutorBookings} />
    );
};

export default BookingWithTutor;
