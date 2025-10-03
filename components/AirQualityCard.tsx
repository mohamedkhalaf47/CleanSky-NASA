import { Gauge } from "lucide-react";
import { getAQIColor, getAQILabel } from "../utils/weatherHelpers";

interface AirQualityCardProps {
	airQuality?: {
		us_aqi?: number;
		pm10?: number;
		pm2_5?: number;
	};
}

export default function AirQualityCard({ airQuality }: AirQualityCardProps) {
	if (!airQuality) return null;

	return (
		<article
			className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-slate-800/50"
			aria-labelledby="air-quality-title"
		>
			<h3
				id="air-quality-title"
				className="text-lg font-bold text-white mb-4 flex items-center gap-2"
			>
				<Gauge className="w-5 h-5 text-cyan-400" aria-hidden="true" />
				Air Quality Index
			</h3>
			<div
				className={`${getAQIColor(
					airQuality.us_aqi
				)} rounded-xl p-6 mb-4 border`}
			>
				<div className="text-center">
					<div className="text-5xl md:text-6xl font-bold mb-2">
						{airQuality.us_aqi ?? "N/A"}
					</div>
					<div className="text-sm font-semibold uppercase tracking-wider">
						{getAQILabel(airQuality.us_aqi)}
					</div>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700/50">
					<div className="text-xs text-slate-400 mb-1 font-medium">PM10</div>
					<div className="text-2xl font-bold text-white">
						{airQuality.pm10?.toFixed(1) ?? "N/A"}
					</div>
					<div className="text-xs text-slate-500 mt-1">µg/m³</div>
				</div>
				<div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700/50">
					<div className="text-xs text-slate-400 mb-1 font-medium">PM2.5</div>
					<div className="text-2xl font-bold text-white">
						{airQuality.pm2_5?.toFixed(1) ?? "N/A"}
					</div>
					<div className="text-xs text-slate-500 mt-1">µg/m³</div>
				</div>
			</div>
		</article>
	);
}
