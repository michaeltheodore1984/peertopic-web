import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Booking } from "@/models/Booking";
import { Tutor, User } from "@/lib/models";
// import BookingsClient from "./BookingClient";
import SignInPage from "../signin/page";

export default async function BookingsPage() {
    const session = await getServerSession(authOptions);

    if (!session) return <SignInPage page="/bookings" />;

    const userId = session?.user.id;

    // fetch student bookings
    const bookings = await Booking.findAll({
        where: { studentId: session?.user.id },
        /* include: [
            {
                model: Tutor,
                as: "tutor",
                include: [{ model: User, as: "user", attributes: ["firstName", "lastName"] }],
            },
        ], */
        // order: [["startTime", "ASC"]]
    });

    // return <BookingsClient bookings={bookings} />;
}
