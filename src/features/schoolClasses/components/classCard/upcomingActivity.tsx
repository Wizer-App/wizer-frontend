import { AlarmClock, ClipboardCheck } from "lucide-react";
import type { Activity } from "../../../activities/types/activity.types";

type UpcomingActivityProps = {
	schoolActivities: Activity[] | null;
};

export default function UpcomingActivity({ schoolActivities }: UpcomingActivityProps) {
	const upcomingActivity =
		schoolActivities && schoolActivities.length > 0
			? schoolActivities
				.filter((a) => a.dueDate)
				.sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())[0]
			: null;

	const hasUpcoming = !!upcomingActivity;
	const colorClass = hasUpcoming ? "text-yellow-600" : "text-green-600";
	return (
		<div className="mt-4">
			<p className={`text-md flex items-center gap-2 ${colorClass}`}>
				{hasUpcoming ? (
					<AlarmClock size={18} className={colorClass} />
				) : (
					<ClipboardCheck size={18} className={colorClass} />
				)}
				Próxima Entrega
			</p>
			<p className="text-gray-500 font-medium mt-1">
				{upcomingActivity
					? `${upcomingActivity.title} (Entrega: ${new Date(upcomingActivity.dueDate!).toLocaleDateString()})`
					: "No hay tareas pendientes"}
			</p>
		</div>
	);
}
