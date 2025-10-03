"use client";
import { useState } from "react";
import { geocodeCity, getForecastWeather } from "../../utils/weatherApi";
import { getWeatherDescription } from "../../utils/weatherHelpers";
import ForecastSearch from "@/components/forecast/ForecastSearch";
import ForecastGrid from "@/components/forecast/ForecastGrid";
import DetailedAnalysis from "@/components/forecast/DetailedAnalysis";
import EmptyState from "@/components/EmptyState";
import ErrorAlert from "@/components/search/ErrorAlert";
import type { ForecastDay } from "@/types/weather";

export default function Page() {
	const [location, setLocation] = useState("");
	const [selectedDate, setSelectedDate] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [forecast, setForecast] = useState<ForecastDay[]>([]);
	const [cityName, setCityName] = useState("");

	const today = new Date();
	const maxDate = new Date();
	maxDate.setDate(today.getDate() + 14);

	const minDateStr = today.toISOString().split("T")[0];
	const maxDateStr = maxDate.toISOString().split("T")[0];

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!location.trim() || !selectedDate) {
			setError("Please enter a location and select a date.");
			return;
		}

		setIsLoading(true);
		setError("");
		setForecast([]);

		try {
			const geocodeData = await geocodeCity(location);

			if (!geocodeData.results || geocodeData.results.length === 0) {
				setError("Location not found. Please try another search.");
				return;
			}

			const city = geocodeData.results[0];
			setCityName(`${city.name}, ${city.country}`);

			const forecastData = await getForecastWeather(
				city.latitude,
				city.longitude
			);

			const forecastDays: ForecastDay[] = forecastData.daily.time.map(
				(date: string, index: number) => ({
					date,
					tempMax: forecastData.daily.temperature_2m_max[index],
					tempMin: forecastData.daily.temperature_2m_min[index],
					precipitation: forecastData.daily.precipitation_sum[index],
					windSpeed: forecastData.daily.wind_speed_10m_max[index],
					weatherCode: forecastData.daily.weather_code[index],
					description: getWeatherDescription(
						forecastData.daily.weather_code[index]
					),
				})
			);

			setForecast(forecastDays);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to fetch forecast data. Please try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	const selectedForecast = forecast.find((day) => day.date === selectedDate);

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
			<section className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-800/50">
				<ForecastSearch
					location={location}
					selectedDate={selectedDate}
					isLoading={isLoading}
					minDate={minDateStr}
					maxDate={maxDateStr}
					onLocationChange={setLocation}
					onDateChange={setSelectedDate}
					onSubmit={handleSearch}
				/>
				{error && <ErrorAlert message={error} />}
			</section>

			{forecast.length > 0 ? (
				<>
					<ForecastGrid
						forecast={forecast}
						selectedDate={selectedDate}
						cityName={cityName}
						onDateSelect={setSelectedDate}
					/>
					{selectedForecast && <DetailedAnalysis forecast={selectedForecast} />}
				</>
			) : (
				!isLoading && <EmptyState />
			)}
		</main>
	);
}
