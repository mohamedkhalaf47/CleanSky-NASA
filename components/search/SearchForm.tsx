import { Search } from "lucide-react";

interface SearchFormProps {
	searchQuery: string;
	isLoading: boolean;
	onSearchChange: (value: string) => void;
	onSubmit: (e: React.FormEvent) => void;
}

export default function SearchForm({
	searchQuery,
	isLoading,
	onSearchChange,
	onSubmit,
}: SearchFormProps) {
	return (
		<form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
			<div className="flex-1 relative">
				<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
				<input
					type="search"
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="Search for any city worldwide..."
					className="w-full pl-12 pr-5 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-slate-500 text-white"
					disabled={isLoading}
				/>
			</div>
			<button
				type="submit"
				disabled={isLoading}
				className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
				aria-label="Search button"
			>
				{isLoading ? (
					<span className="flex items-center gap-2">
						<svg
							className="animate-spin h-5 w-5"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
								fill="none"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Searching...
					</span>
				) : (
					"Search"
				)}
			</button>
		</form>
	);
}
