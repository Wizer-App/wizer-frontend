import { Clock4 } from "lucide-react";
import type { Activity } from "../../../activities/types/activity.types";

type ActivityRecentProps = {
	schoolActivities: Activity[] | null;
};

export default function ActivityRecent({ schoolActivities }: ActivityRecentProps) {

	const recentActivity =
		schoolActivities && schoolActivities.length > 0
			? schoolActivities[schoolActivities.length - 1]
			: null;

	return (
		<div className="mt-4">
			<p className="text-gray-500 text-md flex items-center gap-2">
				<Clock4 size={18} /> Actividad Reciente
			</p>
			<p className="text-gray-500 font-medium mt-1">
				{recentActivity?.title || "Se creó la clase"}
			</p>
		</div>
	);
}
