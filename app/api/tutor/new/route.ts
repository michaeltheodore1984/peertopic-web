// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
// import { Tutor } from "@/lib/model/Tutor";

// // 1️⃣ Zod schema for validation
// const tutorSchema = z.object({
//   hourlyRate: z
//     .union([z.string(), z.number()]) // accept number or string
//     .transform((val) => Number(val)) // convert to number
//     .refine((val) => val > 0, "Hourly rate must be positive"),
//   bio: z.string().max(255, "Bio must be no longer than 255 characters."),
// });

// export async function POST(req: NextRequest) {
//   try {
//     // 2️⃣ Parse and validate request body
//     const body = await req.json();
//     const parsed = tutorSchema.parse(body);

//     const { hourlyRate, bio } = parsed;

//     // 3️⃣ Check if tutor already exists
//     const existingTutor = await Tutor.findOne({ where: { id : '123' } });
//     if (existingTutor) {
//       return NextResponse.json(
//         { message: "Tutor with this email already exists" },
//         { status: 409 } // Conflict
//       );
//     }

//     // 5️⃣ Create new tutor
//     const newTutor = await Tutor.create({
//       hourlyRate,
//       bio,
//     });

//     // 6️⃣ Return safe response
//     return NextResponse.json({
//       message: "Tutor created successfully",
//       data: {
//         id: newTutor.id,
//         uuid: newTutor.uuid,
//         hourlyRate: newTutor.hourlyRate,
//         bio: newTutor.bio,
//       },
//     });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       // 7️⃣ Return validation errors
//       return NextResponse.json({ errors: error.issues }, { status: 400 });
//     }

//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
