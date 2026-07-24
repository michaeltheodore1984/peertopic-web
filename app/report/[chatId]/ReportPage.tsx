'use client';

import { reportUser } from "@/lib/actions";

interface ReportPageProps {
  reporterId: number,
  reportedUserId: number,
  chatId: number,
}

export default function ReportUserPage({ chatId }: ReportPageProps) {

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // await reportUser(chatId);
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-5 text-gray-800">
      <h1 className="text-2xl font-semibold mb-4">Report a User</h1>

      <p className="text-gray-700 mb-6">
        We take the safety of our students and tutors very seriously.
        Our team reviews every report carefully to ensure the platform remains respectful,
        secure, and supportive for everyone. Please let us know what happened so we can take appropriate action.
      </p>

      <h2 className="text-lg font-semibold mb-3">What happened?</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>

        {/* Offense Types */}
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="radio" name="offense" value="harassment" className="accent-red-600" />
            <span>Harassment or bullying</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="offense" value="inappropriate" className="accent-red-600" />
            <span>Inappropriate or offensive behavior</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="offense" value="safety" className="accent-red-600" />
            <span>Threats, unsafe behavior, or safety concerns</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="offense" value="spam" className="accent-red-600" />
            <span>Spam or unwanted messages</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="offense" value="scam" className="accent-red-600" />
            <span>Scam, fraud, or suspicious activity</span>
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="offense" value="other" className="accent-red-600" />
            <span>Other</span>
          </label>
        </div>

        {/* Additional Details */}
        <div>
          <label className="block font-medium mb-1">Additional details (optional)</label>
          <textarea
            placeholder="Please describe what happened..."
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
