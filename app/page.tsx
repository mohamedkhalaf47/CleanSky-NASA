"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CityInfo } from "../types/weather";
import {
	geocodeCity,
	getCurrentWeather,
	getAirQuality,
} from "../utils/weatherApi";
import WeatherCard from "../components/WeatherCard";
import AirQualityCard from "../components/AirQualityCard";
import SearchForm from "@/components/search/SearchForm";
import WelcomeSection from "@/components/layout/WelcomeSection";
import MapHeader from "@/components/map/MapHeader";
import CityHeader from "@/components/weather/CityHeader";
import ErrorAlert from "@/components/search/ErrorAlert";

const MapView = dynamic(() => import("@/components/map/MapView"), {
	ssr: false,
	loading: () => (
		<div
			className="flex items-center justify-center bg-slate-800/30 rounded-lg"
			style={{ height: "700px", width: "100%" }}
		>
			<div className="text-slate-400">Loading map...</div>
		</div>
	),
});

export default function Dashboard() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [cityInfo, setCityInfo] = useState<CityInfo | null>(null);
	const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
	const [mapZoom, setMapZoom] = useState(2);
	const [showGIBS, setShowGIBS] = useState(false);
	const [mapKey, setMapKey] = useState(0);
	const [isMounted, setIsMounted] = useState(false);

	const today = new Date().toISOString().split("T")[0];

	useEffect(() => {
		setIsMounted(true);

		import("leaflet").then((L) => {
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
		});
	}, []);

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

	if (!isMounted) {
		return (
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-slate-400">Loading...</div>
				</div>
			</main>
		);
	}

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
			<section
				className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-800/50"
				aria-label="Search for city"
			>
				<SearchForm
					searchQuery={searchQuery}
					isLoading={isLoading}
					onSearchChange={setSearchQuery}
					onSubmit={handleSearch}
				/>

				{error && <ErrorAlert message={error} />}
			</section>

			{cityInfo ? (
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
					<div className="xl:col-span-1 space-y-6">
						<CityHeader
							name={cityInfo.name}
							country={cityInfo.country}
							latitude={cityInfo.latitude}
							longitude={cityInfo.longitude}
							temperature={cityInfo.weather.temperature_2m}
						/>
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
							<MapHeader
								showGIBS={showGIBS}
								onToggleGIBS={() => setShowGIBS(!showGIBS)}
							/>
							<MapView
								cityInfo={cityInfo}
								showGIBS={showGIBS}
								mapCenter={mapCenter}
								mapZoom={mapZoom}
								mapKey={mapKey}
								today={today}
							/>
						</div>
					</div>
				</div>
			) : (
				<WelcomeSection onQuickSelect={handleQuickSelect} />
			)}
		</main>
	);
}
