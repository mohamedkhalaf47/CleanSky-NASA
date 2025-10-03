"use client";

import { Cloud } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const pathname = usePathname();

	const navItems = [
		{ path: "/", label: "Dashboard" },
		{ path: "/date-search", label: "Forecast" },
		{ path: "/map", label: "Map Explorer" },
	];

	return (
		<header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div className="flex items-center justify-between flex-wrap gap-4">
					<Link
						href="/"
						className="flex items-center gap-3 hover:opacity-80 transition-opacity"
					>
						<div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
							<Cloud className="w-6 h-6 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
								WeaZer Odds Dashboard
							</h1>
							<p className="text-sm text-slate-400">
								NASA Space Apps Challenge
							</p>
						</div>
					</Link>

					<nav className="flex items-center gap-2">
						{navItems.map((item) => (
							<Link
								key={item.path}
								href={item.path}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									pathname === item.path
										? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
										: "text-slate-400 hover:text-white hover:bg-slate-800/50"
								}`}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
}
