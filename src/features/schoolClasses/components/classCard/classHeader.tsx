import { GraduationCap } from "lucide-react";

export default function ClassHeader({ name, teams }: { name: string; teams: number }) {
	return (
		<div className="flex justify-between items-center">
			<h3 className="text-xl font-semibold">{name}</h3>
			<span className="flex items-center text-blue-500 gap-1 mt-2 text-xs">
				<GraduationCap size={20} />
				<div className="bg-blue-500 text-white px-2 py-1 rounded-2xl">
					{teams} equipos
				</div>
			</span>
		</div>
	);
}