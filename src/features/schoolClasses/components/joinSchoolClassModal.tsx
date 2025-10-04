import { useState } from "react";
import { apiClient } from "../../../services/apiClient";
import type { JoinClassRequest } from "../dtos/schoolClass.dto";
import { davo } from "../userTest";

type JoinSchoolClassModalProps = {
	onClose: () => void;
};

export default function JoinSchoolClassModal({ onClose }: JoinSchoolClassModalProps) {
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleJoin = async () => {
		setLoading(true);
		setError("");

		try {
			const data: JoinClassRequest = { joinCode: code.trim(), userId: davo.id };
			await apiClient.post("schoolclasses/join", data);
			onClose();
			setCode("");
		} catch (err: any) {
			setError(err.response?.data?.message || "Error al unirse a la clase");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
				<h2 className="text-lg font-semibold mb-4">Unirse a una Clase</h2>
				<p className="text-sm mb-1">Código de la clase</p>
				<input
					type="text"
					placeholder="Ej: ABCDEF"
					value={code}
					onChange={(e) => setCode(e.target.value.toUpperCase())} // mayúsculas
					maxLength={6}
					className="w-full p-2 border rounded mb-2"
				/>
				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}
				<div className="flex gap-2">
					<button
						className={`flex-1 py-2 rounded-md text-white ${code.trim().length === 6
							? "bg-blue-500 hover:bg-blue-600"
							: "bg-blue-300 cursor-not-allowed"
							}`}
						disabled={code.trim().length !== 6 || loading}
						onClick={handleJoin}
					>
						{loading ? "Uniendo..." : "Unirse"}
					</button>
					<button
						className="flex-1 py-2 bg-white rounded-md hover:bg-gray-100"
						onClick={() => {
							setCode("");
							setError("");
							onClose();
						}}
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
}
