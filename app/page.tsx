"use client"
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search, Cloud, MapPin, Satellite } from "lucide-react";
import { CityInfo } from "../types/weather";
import {
	geocodeCity,
	getCurrentWeather,
	getAirQuality,
} from "../utils/weatherApi";
import WeatherCard from "../components/WeatherCard";
import AirQualityCard from "../components/AirQualityCard";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
	iconUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapController({
	center,
	zoom,
}: {
	center: [number, number];
	zoom: number;
}) {
	const map = useMap();

	useEffect(() => {
		map.flyTo(center, zoom, {
			duration: 2,
			easeLinearity: 0.25,
		});
	}, [center, zoom, map]);

	return null;
}

export default function Dashboard() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [cityInfo, setCityInfo] = useState<CityInfo | null>(null);
	const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
	const [mapZoom, setMapZoom] = useState(2);
	const [showGIBS, setShowGIBS] = useState(false);
	const [mapKey, setMapKey] = useState(0);

	const today = new Date().toISOString().split("T")[0];

	const searchCity = async (cityName: string) => {
		if (!cityName.trim()) return;

		setIsLoading(true);
		setError("");

		try {
			const geocodeData = await geocodeCity(cityName);

			if (!geocodeData.results || geocodeData.results.length === 0) {
				setError("City not found. Try another name.");
				setIsLoading(false);
				return;
			}

			const city = geocodeData.results[0];
			const { latitude, longitude, name, country } = city;

			const weatherData = await getCurrentWeather(latitude, longitude);
			const airQualityData = await getAirQuality(latitude, longitude);

			setMapCenter([latitude, longitude]);
			setMapZoom(12);
			setShowGIBS(true);
			setMapKey((prev) => prev + 1);

			setCityInfo({
				name,
				country,
				latitude,
				longitude,
				weather: weatherData.current,
				airQuality: airQualityData,
			});
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Something went wrong. Please try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		searchCity(searchQuery);
	};

	const handleQuickSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const city = e.target.value;
		if (city) {
			setSearchQuery(city);
			searchCity(city);
			e.target.value = "";
		}
	};

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
			<section
				className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-800/50"
				aria-label="Search for city"
			>
				<form
					onSubmit={handleSearch}
					className="flex flex-col sm:flex-row gap-3"
				>
					<div className="flex-1 relative">
						<Search
							className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
							aria-hidden="true"
						/>
						<input
							type="search"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search for any city worldwide..."
							className="w-full pl-12 pr-5 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-slate-500 text-white"
							disabled={isLoading}
							aria-label="City search input"
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
						aria-label="Search button"
					>
						{isLoading ? (
							<span className="flex items-center gap-2">
								<svg
									className="animate-spin h-5 w-5"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
										fill="none"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
								Searching...
							</span>
						) : (
							"Search"
						)}
					</button>
				</form>

				{error && (
					<div
						role="alert"
						className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
					>
						<div className="flex items-center gap-2">
							<span className="text-red-500 text-lg" aria-hidden="true">
								⚠️
							</span>
							<span className="text-red-400 font-medium">{error}</span>
						</div>
					</div>
				)}
			</section>

			{cityInfo ? (
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
					<div className="xl:col-span-1 space-y-6">
						<article className="bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 rounded-2xl shadow-2xl p-6 text-white border border-cyan-500/20">
							<div className="flex items-start justify-between mb-6">
								<div>
									<h2 className="text-3xl md:text-4xl font-bold mb-2">
										{cityInfo.name}
									</h2>
									<p className="text-cyan-100 flex items-center gap-2">
										<MapPin className="w-4 h-4" aria-hidden="true" />
										<span>{cityInfo.country}</span>
									</p>
								</div>
								<div className="text-right text-sm text-cyan-100 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
									<div>{cityInfo.latitude.toFixed(2)}°</div>
									<div>{cityInfo.longitude.toFixed(2)}°</div>
								</div>
							</div>
							<div className="text-6xl md:text-7xl font-bold mb-2">
								{cityInfo.weather.temperature_2m}°C
							</div>
							<p className="text-cyan-100 text-lg">Current Temperature</p>
						</article>

						<WeatherCard
							temperature={cityInfo.weather.temperature_2m}
							humidity={cityInfo.weather.relative_humidity_2m}
							windSpeed={cityInfo.weather.wind_speed_10m}
							precipitation={cityInfo.weather.precipitation}
						/>

						<AirQualityCard airQuality={cityInfo.airQuality} />
					</div>

					<div className="xl:col-span-2">
						<div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-800/50 h-full">
							<div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between flex-wrap gap-3">
								<div className="flex items-center gap-3">
									<MapPin className="w-6 h-6 text-white" aria-hidden="true" />
									<div>
										<h3 className="text-white font-bold text-lg">
											Interactive Map
										</h3>
										<p className="text-cyan-100 text-sm">
											NASA Satellite Imagery
										</p>
									</div>
								</div>
								<button
									onClick={() => setShowGIBS(!showGIBS)}
									className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur-sm flex items-center gap-2"
									aria-label={
										showGIBS
											? "Hide satellite imagery"
											: "Show satellite imagery"
									}
								>
									<Satellite className="w-4 h-4" aria-hidden="true" />
									{showGIBS ? "Hide Satellite" : "Show Satellite"}
								</button>
							</div>
							<MapContainer
								key={mapKey}
								center={mapCenter}
								zoom={mapZoom}
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

								<Marker position={[cityInfo.latitude, cityInfo.longitude]}>
									<Popup>
										<div className="text-center p-2">
											<div className="font-bold text-lg mb-2">
												{cityInfo.name}, {cityInfo.country}
											</div>
											<div className="space-y-1 text-sm">
												<div>{cityInfo.weather.temperature_2m}°C</div>
												<div>{cityInfo.weather.wind_speed_10m} km/h</div>
												<div>{cityInfo.weather.precipitation} mm</div>
											</div>
										</div>
									</Popup>
								</Marker>

								<MapController center={mapCenter} zoom={mapZoom} />
							</MapContainer>
						</div>
					</div>
				</div>
			) : (
				<section className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-slate-800/50">
					<div className="max-w-2xl mx-auto">
						<div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
							<Cloud className="w-10 h-10 text-white" aria-hidden="true" />
						</div>
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
							Welcome to CleanSky
						</h2>
						<p className="text-slate-400 mb-8 text-lg">
							Search for any city worldwide to view real-time weather data and
							NASA satellite imagery
						</p>
						<div className="max-w-sm mx-auto">
							<label
								htmlFor="quick-select"
								className="block text-sm font-medium text-slate-300 mb-3 text-left"
							>
								Quick Start - Select a City:
							</label>
							<select
								id="quick-select"
								onChange={handleQuickSelect}
								className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-medium transition-all"
								aria-label="Quick city selection"
							>
								<option value="">Choose a city...</option>
								<option value="Cairo">Cairo, Egypt</option>
								<option value="London">London, UK</option>
								<option value="Tokyo">Tokyo, Japan</option>
								<option value="New York">New York, USA</option>
								<option value="Paris">Paris, France</option>
								<option value="Sydney">Sydney, Australia</option>
								<option value="Dubai">Dubai, UAE</option>
								<option value="Mumbai">Mumbai, India</option>
							</select>
						</div>
					</div>
				</section>
			)}
		</main>
	);
}
