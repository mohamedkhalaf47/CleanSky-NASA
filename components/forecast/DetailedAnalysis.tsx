import { Droplets, Thermometer, Wind } from "lucide-react";
import { ForecastDay } from "../../types/weather";
import ConditionAnalysis from "./ConditionAnalysis";

interface DetailedAnalysisProps {
	forecast: ForecastDay;
}

export default function DetailedAnalysis({ forecast }: DetailedAnalysisProps) {
	const stats = [
		{
			label: "High Temperature",
			value: `${forecast.tempMax}°C`,
			icon: <Thermometer className="w-5 h-5" />,
			color: "text-orange-400",
			bgColor: "bg-orange-400/10",
		},
		{
			label: "Low Temperature",
			value: `${forecast.tempMin}°C`,
			icon: <Thermometer className="w-5 h-5" />,
			color: "text-blue-400",
			bgColor: "bg-blue-400/10",
		},
		{
			label: "Precipitation",
			value: `${forecast.precipitation}mm`,
			icon: <Droplets className="w-5 h-5" />,
			color: "text-cyan-400",
			bgColor: "bg-cyan-400/10",
		},
		{
			label: "Wind Speed",
			value: `${forecast.windSpeed}km/h`,
			icon: <Wind className="w-5 h-5" />,
			color: "text-green-400",
			bgColor: "bg-green-400/10",
		},
	];

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className={`${stat.bgColor} rounded-xl p-4 border border-white/5`}
					>
						<div className={`${stat.color} mb-2`}>{stat.icon}</div>
						<div className="text-sm text-slate-400">{stat.label}</div>
						<div className={`text-2xl font-bold ${stat.color}`}>
							{stat.value}
						</div>
					</div>
				))}
			</div>

			<ConditionAnalysis forecast={forecast} />
		</div>
	);
}
