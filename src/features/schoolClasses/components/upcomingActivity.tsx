import { ClipboardCheck } from "lucide-react";
import type { Activity } from "../../activities/types/activity.types";

type UpcomingActivityProps = {
	upcomingActivity: Activity | null;
};

export default function UpcomingActivity({ upcomingActivity: upcomingActivity }: UpcomingActivityProps) {
	return (
		<div className="mt-4">
			<p className="text-gray-500 text-md flex items-center gap-2">
				<ClipboardCheck size={18} /> Próxima Entrega
			</p>
			<p className="text-gray-500 font-medium mt-1">
				{upcomingActivity
					? `${upcomingActivity.title} (Entrega: ${new Date(upcomingActivity.dueDate!).toLocaleDateString()})`
					: "No hay tareas pendientes"}
			</p>
		</div>
	);
}
