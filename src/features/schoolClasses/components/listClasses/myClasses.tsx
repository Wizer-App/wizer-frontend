import { useState, useEffect } from "react";

import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { davo } from "../../userTest";
import { getAllSchoolClassesByUserId } from "../../services/schoolClass.service";
import type { SchoolClass } from "../../types/schoolClass.types";
import ClassCard from "../classCard/classCard";

export default function MyClasses() {
	const [classes, setClasses] = useState<SchoolClass[]>([]);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const handleClassClick = (schoolClass: SchoolClass) => {
		navigate(`/schoolclasses/${schoolClass.id}`, { state: { schoolClass } });
	};


	useEffect(() => {
		getAllSchoolClassesByUserId(davo.id)
			.then(setClasses)
			.finally(() => setLoading(false));
	}, []);

	return (
		<div>
			<h2 className="text-3xl font-semibold py-10">Mis Clases</h2>

			{loading ? (
				<div className="flex justify-center items-center py-10">
					<Loader2 className="h-10 w-10 animate-spin text-blue-500" />
					<span className="ml-2 text-gray-600">Cargando clases...</span>
				</div>
			) : classes.length === 0 ? (
				<p>No tienes clases aún.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{classes.map((c) => (
						<ClassCard key={c.id} schoolClass={c} onClick={() => handleClassClick(c)} />
					))}
				</div>
			)}
		</div>
	);
}
