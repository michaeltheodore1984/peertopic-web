// components/TutorTopicSelector.tsx
"use client";

import { useState, useMemo } from "react";
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
}

export default function ExploreTopicSelector({ categories }: Props) {
    const [selected, setSelected] = useState<Topic[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [search, setSearch] = useState("");

    const router = useRouter();

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
        if (selectedTopic?.id === topic.id) {
            setSelected([]);
            setSelectedTopic(null);
        } else {
            setSelected([topic]);
            setSelectedTopic(topic);
        }
    };

    const isSelected = (topicId: number) =>
        selected.some((t) => t.id === topicId);

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-bold text-gray-900">Explore topics</h1>
            <span className="text-gray-900 mb-8 block">What do you want to learn?</span>
            {/* Selected Topics */}
            {selected.length > 0 && (
                <div>
                    <div className="flex flex-wrap gap-2">
                        {selected.map((topic) => (
                            <span
                                key={topic.id}
                                className="px-3 py-1 bg-amber-600 text-white rounded-full cursor-pointer text-sm hover:bg-amber-700"
                                onClick={() => toggleTopic(topic)}>
                                {topic.name} ✕
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Search Field */}
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search topics..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#d4b483] focus:ring-[#d4b483] focus:ring-1 outline-none placeholder-gray-600 text-gray-900 bg-white"
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
                                    className={`px-3 py-1 rounded-full border text-sm transition-colors cursor-pointer
                                        ${isSelected(topic.id)
                                            ? "bg-amber-600 text-white"
                                            : "border-gray-300 text-gray-700 hover:bg-amber-600 hover:text-white hover:border-amber-600"
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
            {selectedTopic && (
                <div className="fixed bottom-6 left-0 right-0 flex justify-center">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-md px-6 py-4 flex items-center gap-4 max-w-md w-full mx-4 sm:mx-auto">
                        <div className="flex-1 text-gray-700">
                            <p className="text-sm text-gray-500">You selected</p>
                            <p className="text-lg font-semibold">{selectedTopic.name}</p>
                        </div>
                        <button
                            className="px-5 py-2 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-500 transition cursor-pointer"

                            onClick={() => router.push('/offers/' + selectedTopic.id)}
                        >
                            Find Tutors →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
