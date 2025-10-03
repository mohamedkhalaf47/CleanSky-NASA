"use client";
import { useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { MapPin, Download, Satellite } from "lucide-react";
import {
	getCurrentWeather,
	getAirQuality,
	reverseGeocode,
} from "../../utils/weatherApi";
import { exportToCSV } from "../../utils/weatherHelpers";
import { LocationData } from "../../types/weather";
import WeatherCard from "../../components/WeatherCard";
import AirQualityCard from "../../components/AirQualityCard";

interface ExtendedIconPrototype extends L.Icon.Default {
	_getIconUrl?: string;
}
delete (L.Icon.Default.prototype as ExtendedIconPrototype)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
	iconUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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

function MapClickHandler({
	onLocationSelect,
}: {
	onLocationSelect: (lat: number, lng: number) => void;
}) {
	useMapEvents({
		click: (e) => {
			onLocationSelect(e.latlng.lat, e.latlng.lng);
		},
	});
	return null;
}

export default function Page() {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showGIBS, setShowGIBS] = useState(false);

	const today = new Date().toISOString().split("T")[0];

	const handleLocationSelect = async (lat: number, lng: number) => {
		setIsLoading(true);

		try {
			const [weatherResponse, airQualityData, locationInfo] = await Promise.all(
				[
					getCurrentWeather(lat, lng),
					getAirQuality(lat, lng),
					reverseGeocode(lat, lng),
				]
			);

			setWeatherData({
				location: {
					latitude: lat,
					longitude: lng,
					name: locationInfo?.name || "Unknown Location",
					country: locationInfo?.country || "Unknown",
				},
				temperature: weatherResponse.current.temperature_2m,
				humidity: weatherResponse.current.relative_humidity_2m,
				windSpeed: weatherResponse.current.wind_speed_10m,
				precipitation: weatherResponse.current.precipitation,
				airQuality: airQualityData,
			});
		} catch (error) {
			console.error("Failed to fetch weather data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleExportCSV = () => {
		if (!weatherData) return;

		const csvData = [
			{
				Location: weatherData.location.name,
				Country: weatherData.location.country,
				Latitude: weatherData.location.latitude.toFixed(4),
				Longitude: weatherData.location.longitude.toFixed(4),
				"Temperature (°C)": weatherData.temperature,
				"Humidity (%)": weatherData.humidity,
				"Wind Speed (km/h)": weatherData.windSpeed,
				"Precipitation (mm)": weatherData.precipitation,
				AQI: weatherData.airQuality?.us_aqi || "N/A",
				"PM10 (µg/m³)": weatherData.airQuality?.pm10?.toFixed(1) || "N/A",
				"PM2.5 (µg/m³)": weatherData.airQuality?.pm2_5?.toFixed(1) || "N/A",
				Timestamp: new Date().toISOString(),
			},
		];

		exportToCSV(
			csvData,
			`weather-data-${weatherData.location.name}-${Date.now()}.csv`
		);
	};

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
			<section className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-800/50">
				<div className="flex items-center justify-between flex-wrap gap-4 mb-4">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
							<MapPin className="w-6 h-6 text-white" />
						</div>
						<div>
							<h2 className="text-2xl font-bold text-white">Map Explorer</h2>
							<p className="text-slate-400 text-sm">
								Click anywhere on the map to get weather data
							</p>
						</div>
					</div>

					{weatherData && (
						<button
							onClick={handleExportCSV}
							className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
						>
							<Download className="w-4 h-4" />
							Export CSV
						</button>
					)}
				</div>

				<div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
					<p className="text-slate-300 text-sm flex items-start gap-2">
						<MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
						<span>
							Click or tap any location on the map to view current weather
							conditions. The data includes temperature, humidity, wind speed,
							and air quality information.
						</span>
					</p>
				</div>
			</section>

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
				<div className="xl:col-span-2">
					<div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-800/50">
						<div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between flex-wrap gap-3">
							<div className="flex items-center gap-3">
								<MapPin className="w-6 h-6 text-white" aria-hidden="true" />
								<div>
									<h3 className="text-white font-bold text-lg">
										Interactive Map
									</h3>
									<p className="text-cyan-100 text-sm">
										{isLoading ? "Loading weather data..." : "Click to explore"}
									</p>
								</div>
							</div>
							<button
								onClick={() => setShowGIBS(!showGIBS)}
								className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur-sm flex items-center gap-2"
								aria-label={
									showGIBS ? "Hide satellite imagery" : "Show satellite imagery"
								}
							>
								<Satellite className="w-4 h-4" aria-hidden="true" />
								{showGIBS ? "Hide Satellite" : "Show Satellite"}
							</button>
						</div>

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

							<MapClickHandler onLocationSelect={handleLocationSelect} />

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
					</div>
				</div>

				<div className="xl:col-span-1">
					{weatherData ? (
						<div className="space-y-6">
							<article className="bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 rounded-2xl shadow-2xl p-6 text-white border border-cyan-500/20">
								<div className="flex items-start justify-between mb-6">
									<div>
										<h3 className="text-2xl font-bold mb-2">
											{weatherData.location.name}
										</h3>
										<p className="text-cyan-100 flex items-center gap-2 text-sm">
											<MapPin className="w-4 h-4" aria-hidden="true" />
											<span>{weatherData.location.country}</span>
										</p>
									</div>
									<div className="text-right text-sm text-cyan-100 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
										<div>{weatherData.location.latitude.toFixed(2)}°</div>
										<div>{weatherData.location.longitude.toFixed(2)}°</div>
									</div>
								</div>
								<div className="text-6xl font-bold mb-2">
									{weatherData.temperature}°C
								</div>
								<p className="text-cyan-100 text-lg">Current Temperature</p>
							</article>

							<WeatherCard
								temperature={weatherData.temperature}
								humidity={weatherData.humidity}
								windSpeed={weatherData.windSpeed}
								precipitation={weatherData.precipitation}
							/>

							<AirQualityCard airQuality={weatherData.airQuality} />
						</div>
					) : (
						<div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-slate-800/50">
							<div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
								<MapPin className="w-10 h-10 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-white mb-3">
								Select a Location
							</h3>
							<p className="text-slate-400">
								Click anywhere on the map to view weather conditions for that
								location
							</p>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
