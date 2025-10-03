"use client"
import { useState } from "react";
import {
	Search,
	Calendar,
	Cloud,
	AlertTriangle,
	TrendingUp,
} from "lucide-react";
import { geocodeCity, getForecastWeather } from "../../utils/weatherApi";
import { getWeatherDescription } from "../../utils/weatherHelpers";

interface ForecastDay {
	date: string;
	tempMax: number;
	tempMin: number;
	precipitation: number;
	windSpeed: number;
	weatherCode: number;
	description: string;
}

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
				setIsLoading(false);
				return;
			}

			const city = geocodeData.results[0];
			setCityName(`${city.name}, ${city.country}`);

			const forecastData = await getForecastWeather(
				city.latitude,
				city.longitude
			);

			const forecastDays: ForecastDay[] = forecastData.daily.time.map(
				(date, index) => ({
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

	const getConditionAnalysis = (day: ForecastDay) => {
		const conditions = [];

		if (day.precipitation > 10) {
			conditions.push("Heavy precipitation expected - plan accordingly");
		} else if (day.precipitation > 5) {
			conditions.push("Moderate rain possible - bring an umbrella");
		} else if (day.precipitation > 0) {
			conditions.push("Light precipitation possible");
		} else {
			conditions.push("No precipitation expected");
		}

		if (day.windSpeed > 40) {
			conditions.push("Strong winds - outdoor activities may be affected");
		} else if (day.windSpeed > 25) {
			conditions.push("Moderate winds expected");
		}

		if (day.tempMax > 30) {
			conditions.push("Hot weather - stay hydrated");
		} else if (day.tempMin < 5) {
			conditions.push("Cold weather - dress warmly");
		}

		return conditions;
	};

	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
			<section className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-800/50">
				<div className="flex items-center gap-3 mb-6">
					<div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
						<Calendar className="w-6 h-6 text-white" />
					</div>
					<div>
						<h2 className="text-2xl font-bold text-white">Forecast Search</h2>
						<p className="text-slate-400 text-sm">
							Get weather predictions up to 14 days ahead
						</p>
					</div>
				</div>

				<form onSubmit={handleSearch} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="relative">
							<Search
								className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
								aria-hidden="true"
							/>
							<input
								type="text"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								placeholder="Enter city or location..."
								className="w-full pl-12 pr-5 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-slate-500 text-white"
								disabled={isLoading}
								aria-label="Location input"
							/>
						</div>

						<div className="relative">
							<Calendar
								className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
								aria-hidden="true"
							/>
							<input
								type="date"
								value={selectedDate}
								onChange={(e) => setSelectedDate(e.target.value)}
								min={minDateStr}
								max={maxDateStr}
								className="w-full pl-12 pr-5 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white"
								disabled={isLoading}
								aria-label="Date input"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
					>
						{isLoading ? (
							<span className="flex items-center justify-center gap-2">
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
							"Get Forecast"
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

			{forecast.length > 0 && (
				<>
					<section className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-800/50">
						<h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
							<TrendingUp className="w-5 h-5 text-cyan-400" />
							14-Day Forecast for {cityName}
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{forecast.map((day) => (
								<div
									key={day.date}
									className={`bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border transition-all cursor-pointer ${
										day.date === selectedDate
											? "border-cyan-500 shadow-lg shadow-cyan-500/20"
											: "border-slate-700/50 hover:border-slate-600"
									}`}
									onClick={() => setSelectedDate(day.date)}
								>
									<div className="text-sm text-slate-400 mb-2">
										{new Date(day.date).toLocaleDateString("en-US", {
											weekday: "short",
											month: "short",
											day: "numeric",
										})}
									</div>
									<div className="flex justify-between items-center mb-2">
										<div>
											<div className="text-2xl font-bold text-white">
												{day.tempMax}°
											</div>
											<div className="text-sm text-slate-400">
												{day.tempMin}°
											</div>
										</div>
										<Cloud className="w-8 h-8 text-cyan-400" />
									</div>
									<div className="text-xs text-slate-300 truncate">
										{day.description}
									</div>
									<div className="mt-2 pt-2 border-t border-slate-700/50 text-xs text-slate-400">
										Rain: {day.precipitation}mm
									</div>
								</div>
							))}
						</div>
					</section>

					{selectedForecast && (
						<section className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-800/50">
							<h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
								<AlertTriangle className="w-5 h-5 text-cyan-400" />
								Detailed Analysis for{" "}
								{new Date(selectedForecast.date).toLocaleDateString("en-US", {
									weekday: "long",
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
								<div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 rounded-xl p-6 text-white">
									<div className="text-sm text-cyan-100 mb-2">
										Temperature Range
									</div>
									<div className="flex items-baseline gap-2">
										<span className="text-5xl font-bold">
											{selectedForecast.tempMax}°
										</span>
										<span className="text-2xl text-cyan-100">
											/ {selectedForecast.tempMin}°C
										</span>
									</div>
								</div>

								<div className="space-y-3">
									<div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
										<div className="text-xs text-slate-400 mb-1">
											Weather Condition
										</div>
										<div className="text-lg font-semibold text-white">
											{selectedForecast.description}
										</div>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
											<div className="text-xs text-slate-400 mb-1">
												Precipitation
											</div>
											<div className="text-xl font-bold text-white">
												{selectedForecast.precipitation}mm
											</div>
										</div>
										<div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
											<div className="text-xs text-slate-400 mb-1">
												Wind Speed
											</div>
											<div className="text-xl font-bold text-white">
												{selectedForecast.windSpeed}km/h
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
								<h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
									Condition Analysis
								</h4>
								<ul className="space-y-2">
									{getConditionAnalysis(selectedForecast).map(
										(condition, index) => (
											<li
												key={index}
												className="flex items-start gap-2 text-slate-300"
											>
												<span className="text-cyan-400 mt-1">•</span>
												<span>{condition}</span>
											</li>
										)
									)}
								</ul>
							</div>
						</section>
					)}
				</>
			)}

			{forecast.length === 0 && !isLoading && (
				<section className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-slate-800/50">
					<div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
						<Calendar className="w-10 h-10 text-white" />
					</div>
					<h3 className="text-2xl font-bold text-white mb-3">Plan Ahead</h3>
					<p className="text-slate-400 max-w-md mx-auto">
						Enter a location and select a date to view detailed weather
						forecasts and analysis
					</p>
				</section>
			)}
		</main>
	);
}
