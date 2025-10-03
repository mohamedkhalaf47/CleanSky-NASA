interface ErrorAlertProps {
	message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
	return (
		<div
			role="alert"
			className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
		>
			<div className="flex items-center gap-2">
				<span className="text-red-500 text-lg" aria-hidden="true">
					⚠️
				</span>
				<span className="text-red-400 font-medium">{message}</span>
			</div>
		</div>
	);
}
