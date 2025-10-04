import { useEffect, useState } from "react";
import type { SchoolClass } from "../types/schoolClass.types";
import type { CreateSchoolClassDto } from "../dtos/schoolClass.dto";
import { getAllSchoolClassesByUserId, addSchoolClass, deleteSchoolClass } from "../services/schoolClass.service";
import Header from "../components/header";

export default function SchoolClassList() {
	const [classes, setClasses] = useState<SchoolClass[]>([]);

	useEffect(() => {
		getAllSchoolClassesByUserId(2).then(setClasses);
	}, []);

	const handleAdd = async () => {
		const newClass: CreateSchoolClassDto = {
			name: "Nueva clase",
			description: "Clase prueba",
			teacher: { id: 2 },
		};
		const result = await addSchoolClass(newClass);
		setClasses([...classes, result]);
	};

	const handleDelete = async (id: number) => {
		await deleteSchoolClass(id);
		setClasses(classes.filter(c => c.id !== id));
	};

	return (
		<div>
			<Header />
			<h2>Clases</h2>
			<button onClick={handleAdd}>Agregar clase</button>
			<ul>
				{classes.map(c => (
					<li key={c.id}>
						{c.name} - {c.description}
						<button onClick={() => handleDelete(c.id)}>Eliminar</button>
					</li>
				))}
			</ul>
		</div>
	);
}
