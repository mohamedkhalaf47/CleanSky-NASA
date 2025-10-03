export const getAQIColor = (aqi?: number): string => {
	if (!aqi) return "bg-gray-700/50 text-gray-300";
	if (aqi <= 50)
		return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
	if (aqi <= 100)
		return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
	if (aqi <= 150)
		return "bg-orange-500/20 text-orange-400 border-orange-500/50";
	if (aqi <= 200) return "bg-red-500/20 text-red-400 border-red-500/50";
	return "bg-rose-500/20 text-rose-400 border-rose-500/50";
};

export const getAQILabel = (aqi?: number): string => {
	if (!aqi) return "N/A";
	if (aqi <= 50) return "Good";
	if (aqi <= 100) return "Moderate";
	if (aqi <= 150) return "Unhealthy for Sensitive";
	if (aqi <= 200) return "Unhealthy";
	return "Very Unhealthy";
};

export const getWeatherDescription = (code: number): string => {
	const weatherCodes: Record<number, string> = {
		0: "Clear sky",
		1: "Mainly clear",
		2: "Partly cloudy",
		3: "Overcast",
		45: "Foggy",
		48: "Depositing rime fog",
		51: "Light drizzle",
		53: "Moderate drizzle",
		55: "Dense drizzle",
		61: "Slight rain",
		63: "Moderate rain",
		65: "Heavy rain",
		71: "Slight snow",
		73: "Moderate snow",
		75: "Heavy snow",
		77: "Snow grains",
		80: "Slight rain showers",
		81: "Moderate rain showers",
		82: "Violent rain showers",
		85: "Slight snow showers",
		86: "Heavy snow showers",
		95: "Thunderstorm",
		96: "Thunderstorm with slight hail",
		99: "Thunderstorm with heavy hail",
	};

	return weatherCodes[code] || "Unknown";
};

export const exportToCSV = (data: any[], filename: string) => {
	if (data.length === 0) return;

	const headers = Object.keys(data[0]);
	const csvContent = [
		headers.join(","),
		...data.map((row) => headers.map((header) => row[header]).join(",")),
	].join("\n");

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);

	link.setAttribute("href", url);
	link.setAttribute("download", filename);
	link.style.visibility = "hidden";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
