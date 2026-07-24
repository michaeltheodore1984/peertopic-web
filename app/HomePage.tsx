import Header from "@/components/header";
import Link from "next/link";

interface HomePageProps {
  header: string;
}


export default function HomePage({ header }: HomePageProps) {
  return (
    <main className="min-h-screen bg-white text-[#e6eef6]">
      {/* {header === 'normal' ? <Header/> : <span className="text-gray-800">hi</span>} */}
      {/* Hero Section */}

      <section className="bg-indigo-50 pt-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:py-20 px-4">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Learn. Teach. Earn.
            </h1>
            <p className="text-gray-600 mb-6">
              PeerTopic is a tutoring marketplace where you can teach your peers,
              learn from experts, and earn money for your time.
            </p>
            <div className="space-x-4">

              <Link href="/explore">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                  Explore Topics
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1 mt-8 md:mt-0">
            <div className="bg-[#0b1220] rounded-xl p-6 shadow-[0_10px_30px_rgba(2,6,23,0.7)]">
              {/* Placeholder for app hero screenshot */}
              <div className="h-64 bg-gradient-to-b from-white/2 to-white/1 rounded-lg flex items-center justify-center">
                <span className="text-[#9aa4b2]">App Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Benefits />
      <Features />
      <HowItWorks />

      <section id="pricing" className="min-h-screen bg-[#f3f1e8] text-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Pricing</h1>
            <p className="text-lg text-gray-700">
              Simple and transparent pricing for tutors and learners.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tutor Pricing Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between">
              <h2 className="text-2xl font-semibold mb-4">Tutors</h2>
              <p className="text-gray-700 mb-6">
                Get paid to teach your peers. Start with 2 free lessons before paying for your monthly subscription. Cancel anytime.
              </p>
              <div className="text-4xl font-bold mb-6">
                $9 <span className="text-lg font-normal">/ month</span>
              </div>
              <ul className="mb-6 space-y-2 text-gray-600">
                <li>✅ First 2 lessons are free</li>
                <li>✅ Paid lessons with your peers</li>
                <li>✅ Manage your tutoring schedule</li>
              </ul>
              <Link href='/signup'>
                <button className="bg-[#7c5cff] text-white font-semibold px-6 py-3 rounded hover:bg-[#6951d1] transition">
                  Become a Tutor
                </button>
              </Link>
            </div>

            {/* Learner Pricing Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between">
              <h2 className="text-2xl font-semibold mb-4">Learners</h2>
              <p className="text-gray-700 mb-6">
                Learning is always free. You only pay your tutor for sessions.
              </p>
              <div className="text-4xl font-bold mb-6">
                Free
              </div>
              <ul className="mb-6 space-y-2 text-gray-600">
                <li>✅ Access all learning materials</li>
                <li>✅ Book lessons with tutors</li>
                <li>✅ No monthly fees</li>
              </ul>
              <Link href="/explore">
                <button className="bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded hover:bg-gray-300 transition">
                  Start Learning
                </button>
              </Link>
            </div>
          </div>

          <section className="mt-16 text-center">
            <p className="text-gray-700">
              All payments are handled securely through the platform. Tutors earn, learners pay only for lessons they take.
            </p>
          </section>
        </div>
      </section>

      <section id="contact" className="bg-[#f3f1e8] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center md:justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#7c5cff]">Need Help?</h2>
              <p className="text-gray-700 mb-4">
                Have questions or feedback? Reach out to us anytime.
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> <a href="mailto:support@peertopic.com" className="text-black"><strong>support@peertopic.com</strong></a>
              </p>
            </div>
            <div>
              <a
                href="mailto:support@peertopic.com"
                className="inline-block bg-[#7c5cff] text-white font-semibold px-6 py-3 rounded hover:bg-[#6951d1] transition"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-50 p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Ready to Start?</h2>
        <p className="text-gray-700 mb-6">
          Join PeerTopic today and take your skills to the next level.
        </p>
        <Link href="/signup">
          <button className="px-8 py-4 bg-gradient-to-r from-[#7c5cff] to-[#4ec5ff] text-white font-bold rounded-lg shadow-lg hover:opacity-90">
            Get started
          </button>
        </Link>
      </section>
    </main>
  );
}

function Benefits() {
  const benefits = [
    { title: "Experienced Tutors", desc: "Learn casually from experienced tutors." },
    { title: "Flexible Schedule", desc: "Book sessions anytime that suits you." },
    { title: "Affordable Prices", desc: "High-quality tutoring at competitive rates." },
  ];

  return (
    <section id="benefits" className="max-w-6xl mx-auto p-8 md:p-16 space-y-12 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Why Choose PeerTopic?</h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          {benefits.map((b, i) => (
            <div key={i} className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition w-80">
              <h3 className="text-xl font-semibold mb-3 text-indigo-600">{b.title}</h3>
              <p className="text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto p-8 md:p-16 space-y-12 py-20">
      <h2 className="text-3xl font-bold text-center text-gray-700">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#FFF8E7] p-6 rounded-xl shadow-md text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-[#7c5cff] rounded-full flex items-center justify-center font-bold">1</div>
          <h4 className="font-semibold text-lg text-[#1F2937]">Sign Up</h4>
          <p className="text-[#1F2937]">
            Create your free account as a student or tutor.
          </p>
        </div>
        <div className="bg-[#FFF8E7] p-6 rounded-xl shadow-md text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-[#7c5cff] rounded-full flex items-center justify-center font-bold">2</div>
          <h4 className="font-semibold text-lg text-[#1F2937]">Connect</h4>
          <p className="text-[#1F2937]">
            Browse courses, find tutors, and schedule sessions easily.
          </p>
        </div>
        <div className="bg-[#FFF8E7] p-6 rounded-xl shadow-md text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-[#7c5cff] rounded-full flex items-center justify-center font-bold">3</div>
          <h4 className="font-semibold text-lg text-[#1F2937]">Learn & Earn</h4>
          <p className="text-[#1F2937]">
            Students learn, tutors earn, and everyone grows together.
          </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    "One-on-one tutoring sessions",
    "Video and chat support",
    "Progress tracking and feedback",
    "Wide range of subjects",
    "Easy scheduling",
    "Secure payments",
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto p-8 md:p-16 space-y-12 py-20 bg-indigo-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-indigo-600 text-2xl">✔</span>
              <p className="text-gray-700">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}