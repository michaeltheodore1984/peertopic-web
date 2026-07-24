'use client';

import { GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput } from "@/util/pass";
import { createAccount } from "@/lib/actions";

export function CreateAccountPage() {
    const [err, setErr] = useState('');
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await createAccount(formData);

        if (!result.success) {
            // console.log(result);
            const messages = result.errors?.map(err => err).join(", ");
            setErr(messages!);
        } else {
            router.replace('/signin')
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-200 text-gray-800 px-6 py-12">
            <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-xl shadow-lg p-8">
                <div className="flex justify-center">
                    <div className="bg-blue-200 text-[#3d3425] w-14 h-14 flex items-center justify-center rounded-full mb-4">
                        <GraduationCap size={28} />
                    </div>
                </div>

                <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">


                    {/* First name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">First name</label>
                        <input
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="Your first name"
                            className="w-full px-4 py-2 rounded-lg border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100 placeholder:text-gray-400 text-black"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@email.com"
                            className="w-full px-4 py-2 rounded-lg border  border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100 placeholder:text-gray-400 text-black"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <PasswordInput
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                        />
                    </div>



                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-200 text-gray-900 font-semibold py-2 rounded-lg hover:bg-blue-300 transition"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-10">
                    <p className="text-[#665c4b] text-sm">
                        Already have an account?{" "}
                        <button
                            onClick={() => router.push("/signin")}
                            className="text-[#3d3425] font-medium underline hover:text-[#5a4a30] cursor-pointer"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
                {
                    err.length > 0 &&
                    <div id="errors" className="text-red-600 text-center mt-8">{err}</div>
                }
            </div>
        </div>
    );
}