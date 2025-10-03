import {
	GeocodeResult,
	WeatherResponse,
	AirQualityResponse,
	ForecastResponse,
} from "../types/weather";

export const geocodeCity = async (cityName: string): Promise<GeocodeResult> => {
	const response = await fetch(
		`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
			cityName
		)}&count=1&language=en&format=json`
	);

	if (!response.ok) throw new Error("Geocoding failed");
	return response.json();
};

export const getCurrentWeather = async (
	latitude: number,
	longitude: number
): Promise<WeatherResponse> => {
	const response = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto`
	);

	if (!response.ok) throw new Error("Weather fetch failed");
	return response.json();
};

export const getForecastWeather = async (
	latitude: number,
	longitude: number
): Promise<ForecastResponse> => {
	const response = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code&timezone=auto`
	);

	if (!response.ok) throw new Error("Forecast fetch failed");
	return response.json();
};

export const getAirQuality = async (
	latitude: number,
	longitude: number
): Promise<AirQualityResponse["current"] | undefined> => {
	try {
		const response = await fetch(
			`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm10,pm2_5`
		);

		if (response.ok) {
			const data: AirQualityResponse = await response.json();
			return data.current;
		}
	} catch (error) {
		console.warn("Air quality data not available", error);
	}
	return undefined;
};

export const reverseGeocode = async (
	latitude: number,
	longitude: number
): Promise<{ name: string; country: string } | null> => {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
		);

		if (response.ok) {
			const data = await response.json();
			return {
				name:
					data.address?.city ||
					data.address?.town ||
					data.address?.village ||
					"Unknown Location",
				country: data.address?.country || "Unknown",
			};
		}
	} catch (error:unknown) {
		console.warn("Reverse geocoding failed", error);
	}
	return null;
};
