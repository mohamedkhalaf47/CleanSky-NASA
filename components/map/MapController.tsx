import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

interface MapControllerProps {
	center?: [number, number];
	zoom?: number;
	onLocationSelect?: (lat: number, lng: number) => void;
}

export default function MapController({
	center,
	zoom,
	onLocationSelect,
}: MapControllerProps) {
	const map = useMap();

	useMapEvents({
		click: (e) => {
			onLocationSelect?.(e.latlng.lat, e.latlng.lng);
		},
	});

	useEffect(() => {
		if (center && zoom) {
			map.flyTo(center, zoom, {
				duration: 2,
				easeLinearity: 1,
			});
		}
	}, [center, zoom, map]);

	return null;
}
