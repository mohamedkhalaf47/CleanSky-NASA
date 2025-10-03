import { Search, Calendar } from "lucide-react";
import LoadingButton from "../LoadingButton";

interface ForecastSearchProps {
	location: string;
	selectedDate: string;
	isLoading: boolean;
	minDate: string;
	maxDate: string;
	onLocationChange: (value: string) => void;
	onDateChange: (value: string) => void;
	onSubmit: (e: React.FormEvent) => void;
}

export default function ForecastSearch({
	location,
	selectedDate,
	isLoading,
	minDate,
	maxDate,
	onLocationChange,
	onDateChange,
	onSubmit,
}: ForecastSearchProps) {
	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="relative">
					<Search
						className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
						aria-hidden="true"
					/>
					<input
						type="text"
						value={location}
						onChange={(e) => onLocationChange(e.target.value)}
						placeholder="Enter city or location..."
						className="w-full pl-12 pr-5 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-slate-500 text-white"
						disabled={isLoading}
						aria-label="Location input"
					/>
				</div>
				<div className="relative">
					<Calendar
						className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
						aria-hidden="true"
					/>
					<input
						type="date"
						value={selectedDate}
						onChange={(e) => onDateChange(e.target.value)}
						min={minDate}
						max={maxDate}
						className="w-full pl-12 pr-5 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white"
						disabled={isLoading}
						aria-label="Date input"
					/>
				</div>
			</div>
			<LoadingButton
				isLoading={isLoading}
				text="Get Forecast"
				loadingText="Searching..."
			/>
		</form>
	);
}
