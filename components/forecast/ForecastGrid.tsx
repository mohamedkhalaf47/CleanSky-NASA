import { ForecastDay } from "../../types/weather";
import ForecastCard from "./ForecastCard";

interface ForecastGridProps {
	forecast: ForecastDay[];
	selectedDate: string;
	cityName: string;
	onDateSelect: (date: string) => void;
}

export default function ForecastGrid({
	forecast,
	selectedDate,
	cityName,
	onDateSelect,
}: ForecastGridProps) {
	return (
		<section className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-800/50">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-white mb-2">14 Day Forecast</h2>
				<p className="text-slate-400">{cityName}</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{forecast.map((day) => (
					<ForecastCard
						key={day.date}
						day={day}
						isSelected={day.date === selectedDate}
						onSelect={onDateSelect}
					/>
				))}
			</div>
		</section>
	);
}
