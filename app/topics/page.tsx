// app/tutor/topics/page.tsx
import { Tutor, Topic, Category } from '@/lib/models';
import TutorTopicSelector from './TutorTopicSelector';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import SignInPage from '../signin/page';

export default async function TutorTopicsPage() {

  const session = await getServerSession(authOptions);

  if (!session) return <SignInPage page="/topics" />;

  const userId = session?.user.id;

  const tutor = await Tutor.findOne({
    where: {userId: userId},
    include: [{ model: Topic, as: 'topics' }],
  });

  const categories: Category[] = await Category.findAll({
    include: {
      model: Topic,
      as: "topics",
      attributes: ["id", "name"],
    },
    order: [["name", "ASC"]],
  });

  const data = categories.map((cat) => {
    const plainCat = cat.get({ plain: true }) as {
      id: number;
      name: string;
      topics: { id: number; name: string }[];
    };

    return {
      id: plainCat.id,
      name: plainCat.name,
      topics: plainCat.topics.map((t) => ({
        id: t.id,
        name: t.name,
      })),
    };
  });


  return (
    <div className="p-6 bg-[#f7f5ef]">
      <div className="max-w-4xl mx-auto">
        <TutorTopicSelector categories={data} topics={tutor?.toJSON().topics} />
      </div>
    </div>
  );
}
