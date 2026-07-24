
import { sequelize } from "@/lib/db";
import { topicsByCategory } from "@/app/data/topics";

import { User, Tutor, Topic, Category, Chat, Message, Lesson } from "@/lib/models";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Recreate tables (dev only)
    await sequelize.sync({ force: true });

    // 1. Seed Categories & Topics
    const topicMap: Record<string, Topic> = {};

    for (const [categoryName, topics] of Object.entries(topicsByCategory)) {
      const category = await Category.create({ name: categoryName });

      for (const topicName of topics) {
        const topic = await Topic.create({ name: topicName, categoryId: category.id });
        topicMap[topicName] = topic;
      }
    }

    /* const alice = await User.create(
      {
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
        password: "password123",
        tutorProfile: { hourlyRate: 23 },
      },
      {
        include: [{ model: Tutor, as: 'tutorProfile' }],
      }
    ); */

    // console.log("✅ Seed complete");
    console.log("✅ Sync complete");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed", err);
    process.exit(1);
  }
}

seed();
