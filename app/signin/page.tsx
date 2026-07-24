"use client";

import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignInProps {
  page: string | null;
}

export default function SignInPage({ page }: SignInProps) {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password.');
    } else {
      if (page)
        router.replace(page);
      else
        router.replace('/profile')
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-gray-300">
        <div className="flex justify-center">
          <div className="bg-blue-200 text-[#3d3425] w-14 h-14 flex items-center justify-center rounded-full mb-4">
            <GraduationCap size={28} />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-[#3d3425] mb-2 text-center">
          Sign In
        </h1>
        <p className="text-[#665c4b] text-sm text-center mb-8">
          Welcome back! Please enter your details to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#3d3425] mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100 placeholder:text-gray-400 text-black"
              placeholder="you@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#3d3425] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100 text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#665c4b] hover:text-[#3d3425]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full bg-blue-200 text-[#3d3425] py-2 rounded-lg font-semibold hover:bg-blue-300 transition"
          >
            Sign In
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-[#665c4b]">
          <p>
            Forgot your password?{" "}
            <button className="text-[#3d3425] font-medium underline hover:text-[#5a4a30] cursor-pointer">
              Reset
            </button>
          </p>
          <p className="mt-2">
            New to PeerTopic?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-[#3d3425] font-medium underline hover:text-[#5a4a30] cursor-pointer"
            >
              Create an account
            </button>
          </p>
          {
            error.length > 0 &&
            <div id="errors" className="text-red-600 text-center mt-8">{error}</div>
          }
        </div>
      </div>
    </div>
  );
}
