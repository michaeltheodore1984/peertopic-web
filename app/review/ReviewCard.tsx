export interface ReviewUser {
    id: number;
    firstName: string;
}

export interface ReviewData {
    id: number;
    rating: number;
    reviewText?: string;
    createdAt: string;
    student: ReviewUser;
}

interface ReviewCardProps {
    review: ReviewData;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md border">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{review.student.firstName}</h3>

                <span className="text-yellow-500 text-lg">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                </span>
            </div>

            {review.reviewText && (
                <p className="text-gray-700 mt-2 whitespace-pre-wrap">
                    {review.reviewText}
                </p>
            )}

            <p className="text-gray-400 text-xs mt-3">
                {new Date(review.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
}
