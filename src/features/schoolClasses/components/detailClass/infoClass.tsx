import { useState, useCallback, useEffect } from "react";
import ActivityRecent from "../classCard/activityRecent";
import UpcomingActivity from "../classCard/upcomingActivity";
import type { SchoolClass } from "../../types/schoolClass.types";
import { useWizerHub } from "../../../../hooks/useWizerHub";
import { getStudentsByClassId } from "../../services/schoolClass.service";

type InfoClassProps = {
	schoolClass: SchoolClass;
	currentUserId: string | number;
};

export default function InfoClass({ schoolClass, currentUserId }: InfoClassProps) {
	const [studentCount, setStudentCount] = useState(schoolClass.students?.length || 0);

	// ✅ Función para recargar el conteo de estudiantes
	const reloadStudents = useCallback(async () => {
		try {
			const students = await getStudentsByClassId(schoolClass.id);
			setStudentCount(students.length);
			console.log("📊 Conteo actualizado:", students.length);
		} catch (error) {
			console.error("❌ Error al cargar estudiantes:", error);
		}
	}, [schoolClass.id]);

	// ✅ Cargar conteo inicial si no viene en schoolClass
	useEffect(() => {
		if (!schoolClass.students || schoolClass.students.length === 0) {
			reloadStudents();
		}
	}, [schoolClass.students, reloadStudents]);

	// ✅ Escuchar eventos de SignalR (cuando alguien entra o sale)
	useWizerHub(
		schoolClass.id,
		currentUserId,
		reloadStudents,  // onUserJoined
		reloadStudents   // onUserLeft
	);

	return (
		<div>
			<h2 className="mb-2">Información del Curso</h2>

			<div className="flex w-full gap-4">
				<div className="w-1/2 flex flex-col">
					<p className="text-sm text-gray-500">Descripción</p>
					<p className="text-sm">{schoolClass.description}</p>
				</div>
				<div className="w-1/2 flex flex-col">
					<p className="text-sm text-gray-500">Estudiantes Inscritos</p>
					<p className="text-sm font-semibold">{studentCount}</p>
				</div>
			</div>

			<div className="flex w-full gap-4 mt-4">
				<div className="w-1/2 flex flex-col">
					<ActivityRecent schoolActivities={schoolClass.activities} />
				</div>
				<div className="w-1/2 flex flex-col">
					<UpcomingActivity schoolActivities={schoolClass.activities} />
				</div>
			</div>
		</div>
	);
}