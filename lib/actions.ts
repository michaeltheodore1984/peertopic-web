'use server';

import { sequelize } from "@/lib/db";
import { Tutor } from "@/models/Tutor";
import { User } from "@/models/User";
import { Booking } from "@/models/Booking";
import argon2 from "argon2";
import { z } from "zod";
import { Op } from "sequelize";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Chat, TutorTimeOff, UserReport } from "./models";
import Review from "@/models/Review";

const signupSchema = z.object({
    firstName: z.string()
        .max(100)
        .trim()
        .max(100)
        .min(1, "First name is required"),
    email: z.email({ message: "Invalid email address" }).max(100).trim().max(100),
    password: z.string().max(100).trim().max(100).min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
});
// 1-hour booking by default (change if needed)
const BOOKING_DURATION_MINUTES = 60;
// validation schema
const rateSchema = z.number().min(1).max(1000);
const topicIdsSchema = z.array(z.number().int().positive());
const becomeTutorSchema = z.boolean();
const dateSchema = z.date();
const monthSchema = z.object({
    year: z.number().int().min(1970).max(2100),
    month: z.number().int().min(0).max(11), // JS months
});
const createBookingSchema = z.object({
    tutorId: z.number().int().positive(),
    studentId: z.number().int().positive(),
    start: z.date(),
});
const tutorIdSchema = z.number().int().positive();
const daysSchema = z.array(z.number());
const bookingIdSchema = z.number().int().positive();

const reviewSchema = z.object({
    tutorId: z.number().int().positive(),
    studentId: z.number().int().positive(),
    bookingId: z.number().int().positive(),
    reviewText: z.string()
        .max(1000)
        .trim()
        .max(1000, "Please use up to 1000 characters")
        .optional(),
    rating: z.number().int("Rating must be a number.").min(1, "Please select a rating.").max(5),
});

const reportSchema = z.object({
    chatId: z.number().int(),
    offense: z.string().min(1).max(255),
    details: z.string().max(1000).optional(),
});

const tutorProfileSchema = z.object({
    bio: z.string().max(1000).trim().max(1000, "Please use up to 1000 characters.").optional(),
    hourlyRate: z.number().max(1000).min(1, "Please enter an hourly rate."),
    timeOffDates: z.array(z.number()).optional(),
});

const profileSchema = z.object({
    firstName: z.string().max(100).trim().max(100).min(1, "Please enter your first name."),
    lastName: z.string().max(100).trim().max(100).nullable().optional(),
    email: z.email("Please enter a valid email address.").max(100).trim().max(100).min(1, "Please enter your email."),
});

type ServerResult<T = {}> =
    | { success: true; payload: T }
    | { success: false; errors: string[] };

export async function hashPassword(password: string) {
    return await argon2.hash(password);
}

interface CreateAccountInput {
    firstName: string;
    email: string;
    password: string;
};

// Create account i.e. sign up
export async function createAccount(formData: CreateAccountInput) {
    const parsed = signupSchema.safeParse(formData);

    if (!parsed.success) {
        return { success: false, errors: parsed.error.issues.map(i => i.message) };
    }

    const data = parsed.data;

    try {
        const createdUser = await sequelize.transaction(async (t) => {
            const existing = await User.findOne({
                where: { email: data.email },
                transaction: t
            });

            if (existing) throw new Error("User exists.");

            // hash password before saving
            const hashed = await hashPassword(data.password);

            return User.create(
                {
                    firstName: data.firstName,
                    email: data.email,
                    password: hashed,
                },
                { transaction: t }
            );
        });

        return { success: true, payload: { id: createdUser.id } };

    } catch (error) {
        console.error('createAccount error:', error);
        return { success: false, errors: ["Server error."] };
    }
}

function formatTimestampUTC(ts: number) {
    const date = new Date(ts);
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const d = String(date.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export async function saveTutorProfile(tutorId: Number, data: {
    bio?: string;
    hourlyRate: number;
    timeOffDates: number[];
}) {
    const session = await getServerSession(authOptions);

    const userId = session?.user.id;

    if (!session) {
        return { success: false, errors: ["Unauthorized"] };
    }

    // Ensure the current user is updating HIS OWN rate
    if (Number(session.user.id) !== tutorId) {
        return { success: false, errors: ["Forbidden"] };
    }

    // Validate input
    const parsed = tutorProfileSchema.safeParse(data);
    if (!parsed.success) {
        // Return all error messages as a flat array
        const allErrors = parsed.error.issues.map(issue => issue.message);
        return { success: false, errors: allErrors };
    }

    try {
        await sequelize.transaction(async (t) => {
            // Update tutor profile fields
            await Tutor.update(
                {
                    bio: parsed.data.bio,
                    hourlyRate: Number(parsed.data.hourlyRate),
                },
                { where: { userId }, transaction: t }
            );

            // Remove old time-off entries
            await TutorTimeOff.destroy({
                where: { tutorId: userId },
                transaction: t,
            });

            // Insert new time-off entries
            if (parsed.data.timeOffDates) {
                await Promise.all(
                    parsed.data.timeOffDates.map((date: number) =>
                        TutorTimeOff.create(
                            {
                                tutorId: userId,
                                date: formatTimestampUTC(date),
                            },
                            { transaction: t }
                        )
                    )
                );
            }

            return { success: true };
        });
    } catch (error) {
        console.error("saveTutorProfile error:", error);
        return { success: false, errors: ["Unexpected server error"] };
    }

}

export async function saveProfile(userId: number, data: {
    firstName: string,
    lastName: string,
    email: string
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { success: false, errors: ["Unauthorized"] };
    }

    // Ensure the current user is updating HIS OWN rate
    if (Number(session.user.id) !== userId) {
        return { success: false, errors: ["Forbidden"] };
    }

    // Validate input
    const parsed = profileSchema.safeParse(data);

    if (!parsed.success) {
        // Return all error messages as a flat array
        const allErrors = parsed.error.issues.map(issue => issue.message);
        return { success: false, errors: allErrors };
    }

    try {
        await sequelize.transaction(async (t) => {
            // Update tutor profile fields
            await User.update(
                {
                    firstName: parsed.data.firstName,
                    lastName: parsed.data.lastName,
                    email: parsed.data.email,
                },
                { where: { id: userId }, transaction: t }
            );

            return { success: true };
        });
    } catch (error) {
        console.error("saveTutorProfile error:", error);
        return { success: false, errors: ["Unexpected server error"] };
    }

}

export async function saveTutorTopics(topicIds: number[]) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { success: false, errors: ["Unauthorized"] };
    }

    // Validate topic IDs
    const parsed = topicIdsSchema.safeParse(topicIds);
    if (!parsed.success) {
        return { success: false, errors: ["Invalid topic list"] };
    }

    try {
        const result = await sequelize.transaction(async (t) => {
            // Find tutor by logged in user
            const tutor = await Tutor.findOne({
                where: { userId: session.user.id },
                transaction: t,
            });

            if (!tutor) throw new Error("Tutor not found");

            await tutor.setTopics(parsed.data, { transaction: t });

            return { success: true };
        });

        return result;

    } catch (error) {
        console.error("saveTutorTopics error:", error);
        return { success: false, errors: ["Unexpected server error"] };
    }
}

export async function becomeTutor(userId: number, becomeTutor: boolean) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { success: false, errors: ["Unauthorized"] };
    }

    // user cannot update tutoring status of other users
    if (Number(session.user.id) !== userId) {
        return { success: false, errors: ["Forbidden"] };
    }

    // Validate input
    const parsed = becomeTutorSchema.safeParse(becomeTutor);
    if (!parsed.success) {
        return { success: false, errors: ["Invalid value"] };
    }

    try {
        const result = await sequelize.transaction(async (t) => {
            let tutor = await Tutor.findOne({
                where: { userId },
                transaction: t
            });

            if (!tutor) {
                // create only if becoming a tutor
                if (parsed.data) {
                    tutor = await Tutor.create(
                        { userId, active: true },
                        { transaction: t }
                    );
                } else {
                    // nothing to deactivate
                    return { success: true, payload: {} };
                }
            } else {
                // update existing
                await tutor.update(
                    { active: parsed.data },
                    { transaction: t }
                );
            }

            return { success: true };
        });

        return result;

    } catch (error) {
        console.error("becomeTutor error:", error);
        return { success: false, errors: ["Unexpected server error"] };
    }
}

export async function getBookingsForDate(date: Date) {
    const session = await getServerSession(authOptions);

    if (!session)
        return { success: false, errors: ["Unauthorized"] };

    // Validate input
    const parsed = dateSchema.safeParse(date);
    if (!parsed.success)
        return { success: false, errors: ["Invalid date"] };

    const day = parsed.data;

    const startOfDay = new Date(day);
    startOfDay.setHours(8, 0, 0, 0);

    const endOfDay = new Date(day);
    endOfDay.setHours(20, 0, 0, 0);

    try {
        const bookings = await Booking.findAll({
            where: {
                tutorId: session.user.id, // OR studentId or both
                start: { [Op.gte]: startOfDay },
                end: { [Op.lte]: endOfDay },
            },
        });

        const data = bookings.map(b => ({
            start: b.start.getTime(),
            end: b.end.getTime(),
        }));

        return { success: true, payload: data };

    } catch (error) {
        console.error("getBookingsForDate error:", error);
        return { success: false, errors: ["Unexpected server error"] };
    }
}



export async function getBookingsForMonth(year: number, month: number) {
    const session = await getServerSession(authOptions);

    if (!session)
        return { success: false, errors: ["Unauthorized"] };

    const parsed = monthSchema.safeParse({ year, month });
    if (!parsed.success)
        return { success: false, errors: ["Invalid year/month"] };

    const { year: y, month: m } = parsed.data;

    try {
        const startOfMonth = new Date(y, m, 1, 8, 0, 0, 0);
        const endOfMonth = new Date(y, m + 1, 0, 20, 0, 0, 0);

        const bookings = await Booking.findAll({
            where: {
                tutorId: session.user.id, // or studentId, depending on user role
                start: { [Op.gte]: startOfMonth },
                end: { [Op.lte]: endOfMonth },
            },
        });

        const data = bookings.map(b => ({
            tutorId: b.tutorId,
            studentId: b.studentId,
            start: b.start.getTime(),
            end: b.end.getTime(),
        }));

        return { success: true, payload: data };

    } catch (error) {
        console.error("getBookingsForMonth error:", error);
        return { success: false, errors: ["Unexpected server error"] };
    }
}

export async function createBooking(tutorId: number, studentId: number, start: Date) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { success: false, errors: ["Unauthorized"] };
    }

    // Students should only book for themselves
    if (Number(session.user.id) !== studentId) {
        return { success: false, errors: ["Forbidden"] };
    }

    // Validate input
    const parsed = createBookingSchema.safeParse({ tutorId, studentId, start });
    if (!parsed.success) {
        return { success: false, errors: ["Invalid booking data"] };
    }

    const { tutorId: tId, studentId: sId, start: startDate } = parsed.data;

    // Compute end
    const endDate = new Date(startDate.getTime() + BOOKING_DURATION_MINUTES * 60000);

    try {
        return await sequelize.transaction(async (t) => {
            // Check overlapping bookings for this tutor
            const overlapping = await Booking.findOne({
                where: {
                    tutorId: tId,
                    start: { [Op.lt]: endDate },
                    end: { [Op.gt]: startDate },
                },
                transaction: t,
            });

            if (overlapping) {
                return { success: false, errors: ["This time is already booked."] };
            }

            // Create booking
            const booking = await Booking.create(
                { tutorId: tId, studentId: sId, start: startDate, end: endDate },
                { transaction: t }
            );

            await Chat.findOrCreate({
                where: {
                    senderId: booking.studentId,
                    receiverId: booking.tutorId,
                    bookingId: booking.id,
                },

                transaction: t
            });

            return { success: true };
        });
    } catch (error) {
        console.error("createBooking error:", error);
        return { success: false, errors: ["Failed to create booking."] };
    }
}

export async function getTutorTimeOff(tutorId: number) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { success: false, errors: ["Unauthorized"] };
    }

    // Optional: restrict users to their own tutorId
    if (Number(session.user.id) !== tutorId) {
        return { success: false, errors: ["Forbidden"] };
    }

    // Validate input
    const parsed = tutorIdSchema.safeParse(tutorId);
    if (!parsed.success) {
        return { success: false, errors: ["Invalid tutor ID"] };
    }

    try {
        const days = await TutorTimeOff.findAll({
            where: { tutorId: parsed.data },
        });

        const payload = days.map(d => d.date);

        return { success: true };
    } catch (error) {
        console.error("getTutorTimeOff error:", error);
        return { success: false, errors: ["Unexpected server error"] };
    }
}

function tsToDateString(ts: number) {
    const d = new Date(ts);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}


export async function setTutorTimeOff(days: number[], tutorId: number) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { success: false, errors: ["Unauthorized"] };
    }

    // Only allow tutor to modify their own time off
    if (Number(session.user.id) !== tutorId) {
        return { success: false, errors: ["Forbidden"] };
    }

    // Validate inputs
    const tutorParsed = tutorIdSchema.safeParse(tutorId);
    const daysParsed = daysSchema.safeParse(days);

    if (!tutorParsed.success) {
        return { success: false, errors: ["Invalid tutor ID"] };
    }

    if (!daysParsed.success) {
        return { success: false, errors: ["Invalid dates array"] };
    }

    try {
        return await sequelize.transaction(async (t) => {
            // Delete old entries
            await TutorTimeOff.destroy({
                where: { tutorId },
                transaction: t,
            });

            // Insert new entries
            await Promise.all(
                daysParsed.data.map(ts =>
                    TutorTimeOff.create(
                        { tutorId, date: tsToDateString(ts) },
                        { transaction: t }
                    )
                )
            );

            return { success: true };
        });
    } catch (error) {
        console.error("setTutorTimeOff error:", error);
        return { success: false, errors: ["Unexpected server error."] };
    }
}



export async function reviewTutor(
    tutorId: number,
    studentId: number,
    bookingId: number,
    reviewText: string,
    rating: number
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { success: false, errors: ["Unauthorized"] };
    }

    // Ensure logged-in student is the one leaving the review
    if (Number(session.user.id) !== studentId) {
        return { success: false, errors: ["Forbidden"] };
    }

    // Validate inputs
    const parsed = reviewSchema.safeParse({ tutorId, studentId, bookingId, reviewText, rating });
    if (!parsed.success) {
        return { success: false, errors: ["Invalid review data"] };
    }

    try {
        return await sequelize.transaction(async (t) => {
            // Verify the booking exists and belongs to the student and tutor
            const booking = await Booking.findOne({
                where: { id: bookingId, studentId, tutorId },
                transaction: t,
            });

            if (!booking) {
                return { success: false, errors: ["Booking not found or invalid for this review"] };
            }

            // Create the review
            await Review.create(
                {
                    rating: rating,
                    reviewText: reviewText,
                    studentId,
                    tutorId,
                    bookingId,
                },
                { transaction: t }
            );

            return { success: true };
        });
    } catch (error) {
        console.error("reviewTutor error:", error);
        return { success: false, errors: ["Unexpected server error."] };
    }
}



export async function cancelBooking(bookingId: number) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { success: false, errors: ["Unauthorized"] };
    }

    // Validate bookingId
    const parsed = bookingIdSchema.safeParse(bookingId);
    if (!parsed.success) {
        return { success: false, errors: ["Invalid booking ID"] };
    }

    try {
        const booking = await Booking.findByPk(parsed.data);

        if (!booking) {
            return { success: false, errors: ["Booking not found"] };
        }

        // Only the student or tutor can cancel
        if (Number(booking.studentId) !== Number(session.user.id) && booking.tutorId !== Number(session.user.id)) {
            return { success: false, errors: ["Forbidden"] };
        }

        await sequelize.transaction(async (t) => {
            await booking.destroy({ force: true, transaction: t });
        });

        return { success: true };
    } catch (error) {
        console.error("cancelBooking error:", error);
        return { success: false, errors: ["Unexpected server error."] };
    }
}

export async function reportUser(chatId: number, offense: string, details?: string) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return { success: false, errors: ["Unauthorized"] };
    }

    // Validate input
    const parsed = reportSchema.safeParse({ chatId, offense, details });

    if (!parsed.success) {
        return { success: false, errors: ["Invalid fields."] };
    }

    const currentUserId = session.user.id;

    try {
        // Fetch chat and verify participation
        const chat = await Chat.findByPk(chatId);
        if (!chat) throw new Error("Chat not found");
        if (Number(chat.senderId) !== Number(currentUserId) && Number(chat.receiverId) !== Number(currentUserId)) {
            throw new Error("Unauthorized");
        }

        // Compute reported user
        const reportedUserId = Number(chat.senderId) === Number(currentUserId) ? chat.receiverId : chat.senderId;

        // Save report
        await UserReport.create({
            reporterId: currentUserId,
            reportedUserId,
            chatId,
            offense,
            details,
        });

        return { success: true };
    } catch (error) {
        console.error("reportUser error:", error);
        return { success: false, errors: ["Unexpected server error."] };
    }
}

export async function closeChat(chatId: number) {

}

export async function banUser(chatId: number) {

}



