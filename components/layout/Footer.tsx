export default function Footer(){
  return (
		<footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-12">
			<div className="bg-slate-900/30 backdrop-blur-xl rounded-xl p-6 border border-slate-800/50">
				<div className="flex items-start gap-3">
					<div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
						<span className="text-xl" aria-hidden="true">
							💡
						</span>
					</div>
					<div className="flex-1">
						<h3 className="font-bold text-white mb-3 text-lg">How to Use</h3>
						<ul className="text-sm text-slate-400 space-y-2.5 list-disc list-inside">
							<li>
								Search for any city to view current weather conditions and air
								quality
							</li>
							<li>
								Use the Forecast page to plan ahead up to 14 days in advance
							</li>
							<li>
								Explore the Map page to check weather at any global location
							</li>
							<li>
								Toggle satellite imagery to see NASA Earth observation data
								overlays
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}