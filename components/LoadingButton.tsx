interface LoadingButtonProps {
	isLoading: boolean;
	text: string;
	loadingText: string;
}

export default function LoadingButton({
	isLoading,
	text,
	loadingText,
}: LoadingButtonProps) {
	return (
		<button
			type="submit"
			disabled={isLoading}
			className="w-full px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
		>
			{isLoading ? (
				<span className="flex items-center justify-center gap-2">
					<svg
						className="animate-spin h-5 w-5"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
							fill="none"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					{loadingText}
				</span>
			) : (
				text
			)}
		</button>
	);
}
