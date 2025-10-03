interface QuickCitySelectProps {
	onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function QuickCitySelect({ onSelect }: QuickCitySelectProps) {
	return (
		<div className="max-w-sm mx-auto">
			<label
				htmlFor="quick-select"
				className="block text-sm font-medium text-slate-300 mb-3 text-left"
			>
				Quick Start - Select a City:
			</label>
			<select
				id="quick-select"
				onChange={onSelect}
				className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-medium transition-all"
				aria-label="Quick city selection"
			>
				<option value="">Choose a city...</option>
				<option value="Cairo">Cairo, Egypt</option>
				<option value="London">London, UK</option>
				<option value="Tokyo">Tokyo, Japan</option>
				<option value="New York">New York, USA</option>
				<option value="Paris">Paris, France</option>
				<option value="Sydney">Sydney, Australia</option>
				<option value="Dubai">Dubai, UAE</option>
				<option value="Mumbai">Mumbai, India</option>
			</select>
		</div>
	);
}
