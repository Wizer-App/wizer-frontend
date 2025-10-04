import { useState } from "react";
import JoinSchoolClassModal from "./joinSchoolClassModal";
import { Pencil, SquarePlus } from "lucide-react";

export default function SwiftAction() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="bg-white p-6 shadow rounded-lg mt-3">
			<p className="font-semibold text-lg">Acciones Rápidas</p>

			<div className="pt-3 flex gap-3">
				<button
					className="flex-1 py-3 hover:bg-gray-100 font-medium flex items-center justify-center gap-2"
					onClick={() => setIsModalOpen(true)}
				>
					<SquarePlus size={18} />
					Unirse a clase
				</button>

				<button className="flex-1 py-3 hover:bg-gray-100 font-medium flex items-center justify-center gap-2">
					<Pencil size={18} />
					Pizarra
				</button>
			</div>

			{isModalOpen && <JoinSchoolClassModal onClose={() => setIsModalOpen(false)} />}
		</div>
	);
}
