import { MapPin, Download } from "lucide-react";

interface MapExplorerHeaderProps {
	hasData: boolean;
	onExport: () => void;
}

export default function MapExplorerHeader({
	hasData,
	onExport,
}: MapExplorerHeaderProps) {
	return (
		<div className="flex items-center justify-between flex-wrap gap-4 mb-4">
			<div className="flex items-center gap-3">
				<div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
					<MapPin className="w-6 h-6 text-white" />
				</div>
				<div>
					<h2 className="text-2xl font-bold text-white">Map Explorer</h2>
					<p className="text-slate-400 text-sm">
						Click anywhere on the map to get weather data
					</p>
				</div>
			</div>

			{hasData && (
				<button
					onClick={onExport}
					className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
				>
					<Download className="w-4 h-4" />
					Export CSV
				</button>
			)}
		</div>
	);
}
