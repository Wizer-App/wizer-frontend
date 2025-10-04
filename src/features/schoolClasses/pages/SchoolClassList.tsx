import { useEffect, useState } from "react";
import type { SchoolClass } from "../types/schoolClass.types";
import { getAllSchoolClassesByUserId, } from "../services/schoolClass.service";
import Welcome from "../components/welcome";
import { davo } from "../userTest";
import SwiftAction from "../components/swiftAction";

export default function SchoolClassList() {
	const [classes, setClasses] = useState<SchoolClass[]>([]);

	useEffect(() => {
		getAllSchoolClassesByUserId(davo.id).then(setClasses);
	}, []);

	return (
		<div className="bg-gray-50 min-h-screen px-4 sm:px-20 lg:px-40 xl:px-80">
			<Welcome />
			<SwiftAction />
			<ul>
				{classes.map(c => (
					<li key={c.id}>
						{c.name} - {c.description}
					</li>
				))}
			</ul>
		</div>
	);
}
