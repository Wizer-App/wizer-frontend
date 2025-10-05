import { useLocation, useNavigate } from "react-router-dom";
import type { SchoolClass } from "../types/schoolClass.types";
import { GraduationCap, MessageSquare } from "lucide-react";
import ClassTabs from "../components/detailClass/classTabs";
import Chat from "../../common/chat";
import { useState } from "react";

export default function SchoolClassDetail() {
	const location = useLocation();
	const navigate = useNavigate();
	const { schoolClass } = location.state as { schoolClass: SchoolClass };

	const [showChat, setShowChat] = useState(true);

	if (!schoolClass) return <p>Clase no encontrada</p>;

	return (
		<div className="bg-gray-50 min-h-screen px-4 sm:px-20 lg:px-40 xl:px-80 pt-20">
			<button
				onClick={() => navigate(-1)}
				className="my-6 px-4 py-2 font-medium text-black rounded hover:bg-gray-100 transition-colors"
			>
				← Volver
			</button>

			<div className="bg-white shadow p-6 flex items-center gap-4 rounded-md">
				<GraduationCap size={60} className="bg-blue-500 text-white rounded-md p-4" />
				<div>
					<h2 className="text-xl font-semibold">{schoolClass.name}</h2>
					<h3 className="text-lg text-gray-600">
						{schoolClass.teacher.name} {schoolClass.teacher.lastName}
					</h3>
				</div>

				<button
					onClick={() => setShowChat((prev) => !prev)}
					className="ml-auto flex items-center rounded-md gap-2 px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 transition"
				>
					<MessageSquare size={18} />
					<span>{showChat ? "Ocultar Chat" : "Mostrar Chat"}</span>
				</button>
			</div>


			<div className="flex w-full gap-4 mt-4">
				<div className={`flex flex-col ${showChat ? "w-3/4" : "w-full"} transition-all`}>
					<ClassTabs schoolClass={schoolClass} />
				</div>

				{showChat && (
					<div className="flex flex-col w-1/4 transition-all">
						<Chat classId={schoolClass.id} currentUserId={2} />
					</div>
				)}
			</div>
		</div>
	);
}
