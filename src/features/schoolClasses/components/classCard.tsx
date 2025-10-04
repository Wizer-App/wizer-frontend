import { Clock4, GraduationCap, ClipboardCheck } from "lucide-react";
import type { SchoolClass } from "../types/schoolClass.types";
import { davo } from "../userTest";
import ActivityRecent from "./activityRecent";
import UpcomingActivity from "./upcomingActivity";

type ClassCardProps = {
	schoolClass: SchoolClass;
};

export default function ClassCard({ schoolClass }: ClassCardProps) {
	const isTeacher = davo.id === schoolClass.teacher.id;

	const recentActivity =
		schoolClass.activities && schoolClass.activities.length > 0
			? schoolClass.activities[schoolClass.activities.length - 1]
			: null;

	const upcomingActivity =
		schoolClass.activities && schoolClass.activities.length > 0
			? schoolClass.activities
				.filter((a) => a.dueDate)
				.sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())[0]
			: null;

	return (
		<div className={"bg-white shadow rounded-lg p-4 mb-4"}>
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-semibold">{schoolClass.name}</h3>
				<span className="flex items-center text-blue-500 gap-1 mt-2 text-xs">
					<GraduationCap size={20} />
					<div className="bg-blue-500 text-white px-2 py-1 rounded-2xl">
						{schoolClass.teams.length} equipos
					</div>
				</span>
			</div>

			<p className="text-gray-500 text-sm">
				Prof. {schoolClass.teacher.name} {schoolClass.teacher.lastName}{" "}
				{isTeacher && (
					<span className="ml-1 text-sm text-white bg-blue-500 px-2 py-1 rounded-xl">
						Tú
					</span>
				)}
			</p>
			<p className="text-gray-500 text-sm">{schoolClass.students.length} estudiantes</p>

			<ActivityRecent recentActivity={recentActivity} />
			<UpcomingActivity upcomingActivity={upcomingActivity} />
		</div>
	);
}
