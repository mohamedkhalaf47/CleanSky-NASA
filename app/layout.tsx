import "./globals.css";
import type { Metadata } from "next";
import Header from "../components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
	title: "WeaZer Odds",
	description: "Weather and Air Quality Explorer with NASA Satellite Data",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
