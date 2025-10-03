import { Cloud } from "lucide-react";
import { ForecastDay } from "../../types/weather";

interface ForecastCardProps {
	day: ForecastDay;
	isSelected: boolean;
	onSelect: (date: string) => void;
}

export default function ForecastCard({
	day,
	isSelected,
	onSelect,
}: ForecastCardProps) {
	return (
		<div
			className={`bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border transition-all cursor-pointer ${
				isSelected
					? "border-cyan-500 shadow-lg shadow-cyan-500/20"
					: "border-slate-700/50 hover:border-slate-600"
			}`}
			onClick={() => onSelect(day.date)}
		>
			<div className="text-sm text-slate-400 mb-2">
				{new Date(day.date).toLocaleDateString("en-US", {
					weekday: "short",
					month: "short",
					day: "numeric",
				})}
			</div>
			<div className="flex justify-between items-center mb-2">
				<div>
					<div className="text-2xl font-bold text-white">{day.tempMax}°</div>
					<div className="text-sm text-slate-400">{day.tempMin}°</div>
				</div>
				<Cloud className="w-8 h-8 text-cyan-400" />
			</div>
			<div className="text-xs text-slate-300 truncate">{day.description}</div>
			<div className="mt-2 pt-2 border-t border-slate-700/50 text-xs text-slate-400">
				Rain: {day.precipitation}mm
			</div>
		</div>
	);
}
