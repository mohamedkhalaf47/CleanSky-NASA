"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapController from "./MapController";
import { LocationData } from "../../types/weather";

interface WeatherData {
	location: LocationData;
	temperature: number;
	humidity: number;
	windSpeed: number;
	precipitation: number;
	airQuality?: {
		us_aqi?: number;
		pm10?: number;
		pm2_5?: number;
	};
}

interface InteractiveMapProps {
	showGIBS: boolean;
	today: string;
	weatherData: WeatherData | null;
	onLocationSelect: (lat: number, lng: number) => void;
}

export default function InteractiveMap({
	showGIBS,
	today,
	weatherData,
	onLocationSelect,
}: InteractiveMapProps) {
	return (
		<MapContainer
			center={[20, 0]}
			zoom={2}
			scrollWheelZoom={true}
			style={{ height: "700px", width: "100%" }}
			className="z-0"
		>
			<TileLayer
				attribution="&copy; OpenStreetMap"
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				maxZoom={19}
			/>

			{showGIBS && (
				<TileLayer
					attribution="NASA GIBS"
					url={`https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${today}/250m/{z}/{y}/{x}.jpg`}
					opacity={0.6}
					maxZoom={9}
				/>
			)}

			<MapController onLocationSelect={onLocationSelect} />

			{weatherData && (
				<Marker
					position={[
						weatherData.location.latitude,
						weatherData.location.longitude,
					]}
				>
					<Popup>
						<div className="text-center p-2">
							<div className="font-bold text-lg mb-2">
								{weatherData.location.name}
							</div>
							<div className="space-y-1 text-sm">
								<div>{weatherData.temperature}°C</div>
								<div>{weatherData.windSpeed} km/h</div>
								<div>{weatherData.precipitation} mm</div>
							</div>
						</div>
					</Popup>
				</Marker>
			)}
		</MapContainer>
	);
}
