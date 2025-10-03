export interface CityInfo {
	name: string;
	country: string;
	latitude: number;
	longitude: number;
	weather: {
		temperature_2m: number;
		relative_humidity_2m: number;
		wind_speed_10m: number;
		precipitation: number;
	};
	airQuality?: {
		us_aqi?: number;
		pm10?: number;
		pm2_5?: number;
	};
}

export interface GeocodeResult {
	results?: Array<{
		latitude: number;
		longitude: number;
		name: string;
		country: string;
	}>;
}

export interface WeatherResponse {
	current: {
		temperature_2m: number;
		relative_humidity_2m: number;
		precipitation: number;
		wind_speed_10m: number;
	};
}

export interface AirQualityResponse {
	current: {
		us_aqi?: number;
		pm10?: number;
		pm2_5?: number;
	};
}

export interface ForecastResponse {
	daily: {
		time: string[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
		precipitation_sum: number[];
		wind_speed_10m_max: number[];
		weather_code: number[];
	};
}

export interface LocationData {
	latitude: number;
	longitude: number;
	name?: string;
	country?: string;
}
