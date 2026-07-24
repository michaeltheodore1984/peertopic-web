import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      {/* Gray background */}
      <section className="bg-gray-200 p-6 rounded-lg shadow-md">
        <h2 className="text-gray-900 text-xl font-bold mb-2">Gray Background</h2>
        <p className="text-gray-700">
          This uses Tailwind’s built-in <code>bg-gray-200</code>. Neutral and modern.
        </p>
        <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
          Button
        </button>
      </section>

      {/* Cream background */}
      <section className="bg-[#f2efe8] p-6 rounded-lg shadow-md">
        <h2 className="text-gray-900 text-xl font-bold mb-2">Cream Background</h2>
        <p className="text-gray-700">
          This uses a custom color <code>#f7f5ef</code> (bg-cream). Warm and cozy feel.
        </p>
        <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
          Button
        </button>
      </section>

      <div className="bg-cream min-h-screen p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-900 text-xl font-bold mb-2">Title</h2>
            <p className="text-gray-700">Readable body text.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-gray-900 text-xl font-bold mb-2">Another card</h2>
            <p className="text-gray-700">More content here.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
