import { useState, useEffect } from "react";
import type { SchoolClass } from "../types/schoolClass.types";
import { getAllSchoolClassesByUserId } from "../services/schoolClass.service";
import { davo } from "../userTest";
import ClassCard from "./classCard";

export default function MyClasses() {
	const [classes, setClasses] = useState<SchoolClass[]>([]);

	useEffect(() => {
		getAllSchoolClassesByUserId(davo.id).then(setClasses);
	}, []);

	return (
		<div>
			<h2 className="text-3xl font-semibold py-10">Mis Clases</h2>

			{classes.length === 0 ? (
				<p>No tienes clases aún.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{classes.map((c) => (
						<ClassCard key={c.id} schoolClass={c} />
					))}
				</div>
			)}
		</div>
	);
}