"use client";

import { useState, FormEvent } from "react";
import ReviewCard, { ReviewData } from "../ReviewCard";
import { reviewTutor } from "@/lib/actions";
import { Booking, Tutor, User } from "@/lib/models";

export interface ReviewFormValues {
    rating: number;
    reviewText: string;
    bookingId: number;
}

interface ReviewFormProps {
    tutor: Tutor;
    student: User;
    booking: Booking;
}

export default function ReviewPage({ tutor, booking, student }: ReviewFormProps) {
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        reviewTutor(tutor.id, student.id, booking.id, reviewText, rating);
    };

    return (
        <div className=" text-gray-800">
            <div className="max-w-xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">
                    Leave a Review for {tutor.user.firstName}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Rating */}
                    <div>
                        <label className="block font-medium mb-1">Rating</label>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Review Text */}
                    <div>
                        <label className="block font-medium mb-1">Your Review</label>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="w-full p-3 border rounded-md"
                            rows={4}
                            placeholder="Write about your experience... (optional)"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit Review
                    </button>
                </form>
                {/* <ReviewCard review={r}/>               */}
            </div>
        </div>
    );
}
