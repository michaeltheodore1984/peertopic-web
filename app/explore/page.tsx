import { Category, Topic } from "@/lib/models";
import ExploreTopicSelector from "./ExploreTopicSelector";

export default async function ExploreTopicsPage() {

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
    <div className="min-h-screen bg-[#f7f5ef] text-gray-800 p-6">
      <div className="max-w-5xl mx-auto">
       <ExploreTopicSelector categories={data} />
      </div>
    </div>
  );
}