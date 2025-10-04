import { Check, ClipboardCopy } from "lucide-react";
import { useState } from "react";

export default function CopyJoinCode({ joinCode }: { joinCode: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(joinCode);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error("Error copiando el código:", error);
		}
	};

	return (
		<div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2">
			<button
				onClick={handleCopy}
				className="bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2 p-1.5 hover:bg-gray-100 transition mb-2"
				title="Copiar código"
			>
				<span className="font-mono text-gray-700">{joinCode}</span>
				<span className={copied ? 'text-green-600' : 'text-gray-500'}>
					{copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
				</span>
			</button>
		</div>
	);
}
