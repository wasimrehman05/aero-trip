"use client";

import React from "react";
import Link from "next/link";
import { Plane } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm header">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Plane className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">
                                AeroTrip
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
