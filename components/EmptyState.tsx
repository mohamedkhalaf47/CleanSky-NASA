import { Calendar } from "lucide-react";

export default function EmptyState() {
	return (
		<section className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-slate-800/50">
			<div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
				<Calendar className="w-10 h-10 text-white" />
			</div>
			<h3 className="text-2xl font-bold text-white mb-3">Plan Ahead</h3>
			<p className="text-slate-400 max-w-md mx-auto">
				Enter a location and select a date to view detailed weather forecasts
				and analysis
			</p>
		</section>
	);
}
