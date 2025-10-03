import { Cloud } from "lucide-react";
import QuickCitySelect from "../search/QuickCitySelect";

interface WelcomeSectionProps {
	onQuickSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function WelcomeSection({ onQuickSelect }: WelcomeSectionProps) {
	return (
		<section className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center border border-slate-800/50">
			<div className="max-w-2xl mx-auto">
				<div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
					<Cloud className="w-10 h-10 text-white" aria-hidden="true" />
				</div>
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
					Welcome to WeaZer Odds
				</h2>
				<p className="text-slate-400 mb-8 text-lg">
					Search for any city worldwide to view real-time weather data and NASA
					satellite imagery
				</p>
				<QuickCitySelect onSelect={onQuickSelect} />
			</div>
		</section>
	);
}
