import { MapPin } from "lucide-react";

interface CityHeaderProps {
	name: string;
	country: string;
	latitude: number;
	longitude: number;
	temperature: number;
}

export default function CityHeader({
	name,
	country,
	latitude,
	longitude,
	temperature,
}: CityHeaderProps) {
	return (
		<article className="bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 rounded-2xl shadow-2xl p-6 text-white border border-cyan-500/20">
			<div className="flex items-start justify-between mb-6">
				<div>
					<h2 className="text-3xl md:text-4xl font-bold mb-2">{name}</h2>
					<p className="text-cyan-100 flex items-center gap-2">
						<MapPin className="w-4 h-4" aria-hidden="true" />
						<span>{country}</span>
					</p>
				</div>
				<div className="text-right text-sm text-cyan-100 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
					<div>{latitude.toFixed(2)}°</div>
					<div>{longitude.toFixed(2)}°</div>
				</div>
			</div>
			<div className="text-6xl md:text-7xl font-bold mb-2">{temperature}°C</div>
			<p className="text-cyan-100 text-lg">Current Temperature</p>
		</article>
	);
}