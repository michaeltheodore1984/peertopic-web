import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto py-12 px-6 md:px-0">
                <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0">
                    {/* Logo and description */}
                    <div className="md:w-1/3 mr-8">
                        <h1 className="text-2xl font-bold mb-4">PeerTopic</h1>
                        <p className="text-gray-200">
                            Learn. Teach. Earn. PeerTopic connects learners and tutors in a secure, reliable, and rewarding environment.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#benefits" className="hover:underline">
                                    Benefits
                                </Link>
                            </li>
                            <li>
                                <Link href="#features" className="hover:underline">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#how-it-works" className="hover:underline">
                                    How it works
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="hover:underline">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="hover:underline">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div className="md:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 mb-6">
                            <li>
                                <Link href="/terms" className="hover:underline">
                                    Terms of Use
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:underline">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>

                        <div className="flex space-x-4">
                           {/*  <a href="#" className="hover:text-gray-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.94 13.94 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.556 4.9 4.9 0 0 1-2.228-.616c-.054 2.28 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.085 4.919 4.919 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.01-7.514 14.01-14.01 0-.213-.004-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.46-1.18-1.12-1.49-1.12-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.64.35-1.09.63-1.34-2.22-.26-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.4.2 2.44.1 2.7.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .26.18.57.69.48A10.004 10.004 0 0 0 22 12.06c0-5.54-4.5-10.02-10-10.02z" />
                                </svg>
                            </a> */}
                            {/* Add more icons as needed */}
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-300">
                    © {new Date().getFullYear()} PeerTopic. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
