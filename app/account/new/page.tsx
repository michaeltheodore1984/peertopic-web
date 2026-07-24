"use client";

import { PasswordInput } from "@/util/pass";
import { GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ZodIssue {
    path: (string | number)[];
    message: string;
}

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        hourlyRate: 0,
        topics: [] as string[],
        bio: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Create a new user

        const response = await fetch(`/api/tutor/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
            // Clear previous errors
            const errorsContainer = document.getElementById("errors");
            if (errorsContainer) errorsContainer.innerHTML = "";

            // Show Zod validation errors
            if (data.errors) {
                data.errors.forEach((err: ZodIssue) => {
                    const field = err.path[0]; // top-level field name
                    const message = err.message;


                    // Display in HTML (optional)
                    if (errorsContainer) {
                        const p = document.createElement("p");
                        p.textContent = `${field}: ${message}`;
                        errorsContainer.appendChild(p);
                    }

                    // Optionally, highlight the input field
                    const input = document.querySelector<HTMLInputElement>(`[name="${field}"]`);
                    if (input) input.classList.add("error");
                });
            } else if (data.message) {

                if (errorsContainer) {
                    const p = document.createElement("p");
                    p.textContent = data.message;
                    errorsContainer.appendChild(p);
                }
            }

            return; // stop execution on error
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-[#f0ead6] text-gray-800 px-6 py-12">
            <div className="w-full max-w-2xl bg-[#fffaf0] border border-[#d4c49d] rounded-xl shadow-lg p-8">
                <div className="flex justify-center">
                    <div className="bg-[#d4c49d] text-[#3d3425] w-14 h-14 flex items-center justify-center rounded-full mb-4">
                        <GraduationCap size={28} />
                    </div>
                </div>

                <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">


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
                            className="w-full px-4 py-2 rounded-lg border border-[#d4c49d] bg-[#fffaf0] focus:ring-2 focus:ring-[#d4c49d] outline-none"
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
                        className="w-full mt-4 bg-[#d4c49d] text-gray-900 font-semibold py-2 rounded-lg hover:bg-[#c2b47d] transition"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-10">
                    <p className="text-[#665c4b] text-sm">
                        Already have an account?{" "}
                        <button
                            onClick={() => router.push("/account/auth")}
                            className="text-[#3d3425] font-medium underline hover:text-[#5a4a30]"
                        >
                            Sign in
                        </button>
                    </p>
                </div>

                <div id="errors" className="text-red-600 text-center mt-8"></div>
            </div>
        </div>
    );
}
