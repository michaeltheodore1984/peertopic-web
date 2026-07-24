import { ProfileImage, Topic, Tutor, User } from "@/lib/models";
import OffersSelector from "./OffersSelector";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function OffersPage({
  params,
}: {
  params: Promise<{ topicId: number }>;
}) {
  const { topicId } = await params;

  // Fetch session (optional)
  const session = await getServerSession(authOptions);

  if (!topicId) return notFound();

  const topic = await Topic.findByPk(topicId, {
    include: [
      {
        model: Tutor,
        as: 'tutors',
        attributes: ['id', 'hourlyRate', 'bio'],
        include: [
          {
            model: User, as: 'user', attributes: ['id', 'firstName', 'lastName'],
            include: [
              { model: ProfileImage, as: 'profileImage' }
            ]
          },

        ],
      },
    ],
  });

  if (!topic) throw new Error('Topic not found');

  const tutors = topic.toJSON().tutors;

  const filteredTutors = session?.user
    ? tutors.filter((tutor: Tutor) => tutor.user.id !== Number(session.user.id))
    : tutors;

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-bold mb-4 text-gray-900">
          Tutors for {topic.toJSON().name}
        </h1>

        {filteredTutors.length === 0 ? (
          <p className="text-gray-600">No tutors available for this topic.</p>
        ) : (
          <OffersSelector tutors={tutors} />
        )}
      </div>
    </div>
  );
}
