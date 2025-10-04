import type { SchoolClass } from "../../types/schoolClass.types"
import ActivityRecent from "../classCard/activityRecent"
import UpcomingActivity from "../classCard/upcomingActivity"

type InfoClassProps = {
	schoolClass: SchoolClass
}

export default function InfoClass({ schoolClass }: InfoClassProps) {
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
					<p className="text-sm">{schoolClass.students.length}</p>
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
	)
}
