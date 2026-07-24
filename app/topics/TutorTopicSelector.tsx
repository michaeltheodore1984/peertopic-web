// components/TutorTopicSelector.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { saveTutorTopics } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface Topic {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    topics: Topic[];
}

interface Props {
    categories: Category[];
    topics: Topic[];
}

export default function TutorTopicSelector({ categories, topics }: Props) {
    const [selected, setSelected] = useState<Topic[]>([]);
    const [search, setSearch] = useState("");

    const router = useRouter();

    useEffect(() => {
        setSelected(topics);
    }, [categories]);

    // Filter topics by search text
    const filteredCategories = useMemo(() => {
        const lower = search.toLowerCase();
        if (!lower) return categories;
        return categories
            .map((cat) => ({
                ...cat,
                topics: cat.topics.filter((t) =>
                    t.name.toLowerCase().includes(lower)
                ),
            }))
            .filter((cat) => cat.topics.length > 0);
    }, [categories, search]);

    const toggleTopic = (topic: Topic) => {
        setSelected((prev) =>
            prev.some((t) => t.id === topic.id)
                ? prev.filter((t) => t.id !== topic.id)
                : [...prev, topic]
        );
    };

    const isSelected = (topicId: number) =>
        selected.some((t) => t.id === topicId);

    async function handleSave() {
        await saveTutorTopics(selected.map(t => t.id));
        router.replace('/tutor');
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Teach topics</h1>
                <button onClick={() => handleSave()} className="text-sm bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition">
                    SAVE
                </button>
            </div>
            <span className="text-gray-900 mb-8 block text-lg">What topics can you teach?</span>
            {/* Selected Topics */}
            {selected.length > 0 && (
                
                    <div data-testid="selected-topics-pw" className="flex flex-wrap gap-2">
                        {selected.map((topic) => (
                            <span
                                data-testid="selected-topic-pw"
                                key={topic.id}
                                className="px-3 py-1 bg-blue-500 text-white rounded-full cursor-pointer text-sm hover:bg-blue-600"
                                onClick={() => toggleTopic(topic)}
                            >
                                {topic.name} ✕
                            </span>
                        ))}
                    </div>
                
            )}

            {/* Search Field */}
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search topics..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 outline-none placeholder-gray-600 text-gray-900 bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Categories & Topics */}
            <div className="space-y-4">
                {filteredCategories.map((category) => (
                    <div key={category.id}>
                        <h3 className="font-semibold text-gray-700 mb-2">
                            {category.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.topics.map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => toggleTopic(topic)}
                                    className={`px-3 py-1 rounded-full border text-sm transition-colors
                                            ${isSelected(topic.id)
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {topic.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {filteredCategories.length === 0 && (
                    <p className="text-gray-500 text-sm">No topics found.</p>
                )}
            </div>
        </div>
    );
}
