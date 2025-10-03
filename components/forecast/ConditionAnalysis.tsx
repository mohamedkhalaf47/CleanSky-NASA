import { AlertTriangle, Info } from "lucide-react";
import { ForecastDay } from "../../types/weather";

interface ConditionAnalysisProps {
	forecast: ForecastDay;
}

export default function ConditionAnalysis({
	forecast,
}: ConditionAnalysisProps) {
	const getConditionAnalysis = (day: ForecastDay) => {
		const conditions = [];

		if (day.precipitation > 10) {
			conditions.push({
				type: "warning",
				message: "Heavy precipitation expected - plan accordingly",
			});
		} else if (day.precipitation > 5) {
			conditions.push({
				type: "info",
				message: "Moderate rain possible - bring an umbrella",
			});
		}

		if (day.windSpeed > 40) {
			conditions.push({
				type: "warning",
				message: "Strong winds - outdoor activities may be affected",
			});
		}

		if (day.tempMax > 30) {
			conditions.push({
				type: "warning",
				message: "Hot weather - stay hydrated",
			});
		} else if (day.tempMin < 5) {
			conditions.push({
				type: "info",
				message: "Cold weather - dress warmly",
			});
		}

		return conditions;
	};

	const conditions = getConditionAnalysis(forecast);

	return (
		<div className="space-y-3">
			{conditions.map((condition, index) => (
				<div
					key={index}
					className={`flex items-start gap-3 p-4 rounded-xl ${
						condition.type === "warning"
							? "bg-orange-500/10 border border-orange-500/20"
							: "bg-blue-500/10 border border-blue-500/20"
					}`}
				>
					{condition.type === "warning" ? (
						<AlertTriangle className="w-5 h-5 text-orange-400 shrink-0" />
					) : (
						<Info className="w-5 h-5 text-blue-400 shrink-0" />
					)}
					<p
						className={
							condition.type === "warning" ? "text-orange-300" : "text-blue-300"
						}
					>
						{condition.message}
					</p>
				</div>
			))}
		</div>
	);
}
