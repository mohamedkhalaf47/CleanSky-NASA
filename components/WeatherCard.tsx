import { Cloud, Droplets, Wind } from "lucide-react";

interface WeatherCardProps {
	temperature: number;
	humidity: number;
	windSpeed: number;
	precipitation: number;
}

export default function WeatherCard({
	temperature,
	humidity,
	windSpeed,
	precipitation,
}: WeatherCardProps) {
	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="bg-slate-900/50 backdrop-blur-xl rounded-xl shadow-lg p-5 border border-slate-800/50 hover:border-cyan-500/30 transition-all">
				<div className="flex items-center gap-3 mb-3">
					<div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
						<Droplets className="w-5 h-5 text-cyan-400" aria-hidden="true" />
					</div>
					<div className="text-xs text-slate-400 uppercase font-semibold tracking-wide">
						Humidity
					</div>
				</div>
				<div className="text-3xl font-bold text-white">{humidity}%</div>
			</div>

			<div className="bg-slate-900/50 backdrop-blur-xl rounded-xl shadow-lg p-5 border border-slate-800/50 hover:border-blue-500/30 transition-all">
				<div className="flex items-center gap-3 mb-3">
					<div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
						<Wind className="w-5 h-5 text-blue-400" aria-hidden="true" />
					</div>
					<div className="text-xs text-slate-400 uppercase font-semibold tracking-wide">
						Wind Speed
					</div>
				</div>
				<div className="text-3xl font-bold text-white">{windSpeed}</div>
				<div className="text-xs text-slate-400 mt-1">km/h</div>
			</div>

			<div className="bg-slate-900/50 backdrop-blur-xl rounded-xl shadow-lg p-5 border border-slate-800/50 hover:border-cyan-500/30 transition-all col-span-2">
				<div className="flex items-center gap-3 mb-3">
					<div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
						<Cloud className="w-5 h-5 text-cyan-400" aria-hidden="true" />
					</div>
					<div className="text-xs text-slate-400 uppercase font-semibold tracking-wide">
						Precipitation
					</div>
				</div>
				<div className="text-3xl font-bold text-white">{precipitation} mm</div>
			</div>
		</div>
	);
}
