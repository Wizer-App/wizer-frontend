import type { SchoolClass } from "../../types/schoolClass.types";
import { davo } from "../../userTest";
import ActivityRecent from "./activityRecent";
import UpcomingActivity from "./upcomingActivity";
import ClassHeader from "./classHeader";
import CopyJoinCode from "./copyJoinCode";
import ClassTeacherInfo from "./classTeacherInfo";

type ClassCardProps = {
	schoolClass: SchoolClass;
	onClick?: () => void;
};

export default function ClassCard({ schoolClass, onClick }: ClassCardProps) {
	const isTeacher = davo.id === schoolClass.teacher.id;

	return (
		<div onClick={onClick} className="bg-white shadow rounded-lg p-4 mb-4 cursor-pointer hover:shadow-md">
			<ClassHeader name={schoolClass.name} teams={schoolClass.teams.length} />
			<CopyJoinCode joinCode={schoolClass.joinCode} />
			<ClassTeacherInfo teacher={schoolClass.teacher} isTeacher={isTeacher} />
			<p className="text-gray-500 text-sm">{schoolClass.students.length} estudiantes</p>
			<ActivityRecent schoolActivities={schoolClass.activities} />
			<UpcomingActivity schoolActivities={schoolClass.activities} />
		</div>
	);
}
