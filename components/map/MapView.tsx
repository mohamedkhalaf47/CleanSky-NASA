import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CityInfo } from "../../types/weather";
import MapController from "./MapController";

interface MapViewProps {
	cityInfo: CityInfo;
	showGIBS: boolean;
	mapCenter: [number, number];
	mapZoom: number;
	mapKey: number;
	today: string;
}

export default function MapView({
	cityInfo,
	showGIBS,
	mapCenter,
	mapZoom,
	mapKey,
	today,
}: MapViewProps) {
	return (
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
	);
}
