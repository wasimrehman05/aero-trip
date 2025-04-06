import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AeroTrip - Book Your Flights",
    description: "Find and book the best flight deals with AeroTrip"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen flex flex-col">
                    <main className="flex-grow">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
