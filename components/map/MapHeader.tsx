import { MapPin, Satellite } from "lucide-react";

interface MapHeaderProps {
	showGIBS: boolean;
	onToggleGIBS: () => void;
	isLoading?: boolean;
}

export default function MapHeader({ showGIBS, onToggleGIBS }: MapHeaderProps) {
	return (
		<div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between flex-wrap gap-3">
			<div className="flex items-center gap-3">
				<MapPin className="w-6 h-6 text-white" aria-hidden="true" />
				<div>
					<h3 className="text-white font-bold text-lg">Interactive Map</h3>
					<p className="text-cyan-100 text-sm">NASA Satellite Imagery</p>
				</div>
			</div>
			<button
				onClick={onToggleGIBS}
				className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors backdrop-blur-sm flex items-center gap-2"
				aria-label={
					showGIBS ? "Hide satellite imagery" : "Show satellite imagery"
				}
			>
				<Satellite className="w-4 h-4" aria-hidden="true" />
				{showGIBS ? "Hide Satellite" : "Show Satellite"}
			</button>
		</div>
	);
}


/*
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
*/