import { MapPin } from "lucide-react";
import { LocationData } from "@/types/weather";

interface LocationStatsProps {
	location: LocationData;
	temperature: number;
}

export default function LocationStats({
	location,
	temperature,
}: LocationStatsProps) {
	return (
		<article className="bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 rounded-2xl shadow-2xl p-6 text-white border border-cyan-500/20">
			<div className="flex items-start justify-between mb-6">
				<div>
					<h3 className="text-2xl font-bold mb-2">{location.name}</h3>
					<p className="text-cyan-100 flex items-center gap-2 text-sm">
						<MapPin className="w-4 h-4" aria-hidden="true" />
						<span>{location.country}</span>
					</p>
				</div>
				<div className="text-right text-sm text-cyan-100 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
					<div>{location.latitude.toFixed(2)}°</div>
					<div>{location.longitude.toFixed(2)}°</div>
				</div>
			</div>
			<div className="text-6xl font-bold mb-2">{temperature}°C</div>
			<p className="text-cyan-100 text-lg">Current Temperature</p>
		</article>
	);
}
