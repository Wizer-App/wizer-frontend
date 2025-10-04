import { useLocation, useNavigate } from "react-router-dom";
import type { SchoolClass } from "../types/schoolClass.types";
import { GraduationCap } from "lucide-react";
import ClassTabs from "../components/detailClass/classTabs";

export default function SchoolClassDetail() {
	const location = useLocation();
	const navigate = useNavigate();
	const { schoolClass } = location.state as { schoolClass: SchoolClass };

	if (!schoolClass) return <p>Clase no encontrada</p>;

	return (
		<div className="bg-gray-50 min-h-screen px-4 sm:px-20 lg:px-40 xl:px-80 ">
			<button
				onClick={() => navigate(-1)}
				className="my-6 px-4 py-2 font-medium text-black rounded hover:bg-gray-100 transition-colors"
			>
				← Volver
			</button>
			<div className="bg-white shadow p-6 flex items-center gap-4 rounded-md">
				<GraduationCap size={60} className="bg-blue-500 text-white rounded-md p-4" />
				<div className="">
					<h2 className="text-xl font-semibold">{schoolClass.name}</h2>
					<h3 className="text-lg text-gray-600">{schoolClass.teacher.name} {schoolClass.teacher.lastName}</h3>
				</div>
			</div>

			<ClassTabs schoolClass={schoolClass} />
		</div>
	);
}
