import { Info, Users } from "lucide-react";
import { useState, type ReactNode } from "react";
import InfoClass from "./infoClass";
import type { SchoolClass } from "../../types/schoolClass.types";
import { davo } from "../../userTest";

type TabButtonProps = {
	label: string;
	value: "info" | "teams" | "activities" | "schedule";
	activeTab: "info" | "teams" | "activities" | "schedule";
	onClick: (value: "info" | "teams" | "activities" | "schedule") => void;
	icon?: ReactNode;
};

function TabButton({ label, value, activeTab, onClick, icon, }: TabButtonProps) {
	const isActive = activeTab === value;

	return (
		<button
			className={`px-4 py-2 mb-2 rounded-lg flex items-center gap-2 ${isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
				}`}
			onClick={() => onClick(value)}
		>
			{icon && icon}
			{label}
		</button>
	);
}

type ClassTabsProps = {
	schoolClass: SchoolClass;
}

export default function ClassTabs({ schoolClass }: ClassTabsProps) {
	const [activeTab, setActiveTab] = useState<"info" | "teams" | "activities" | "schedule">("info");

	return (
		<div className="mt-4 bg-white rounded-md p-2 ">
			<div className="flex gap-2 border-b border-gray-200 mb-4">
				<TabButton label="Información" value="info" activeTab={activeTab} onClick={setActiveTab} icon={<Info size={18} />}
				/>
				<TabButton label="Equipos" value="teams" activeTab={activeTab} onClick={setActiveTab} icon={<Users size={18} />} />
				<TabButton label="Actividades" value="activities" activeTab={activeTab} onClick={setActiveTab} />
				<TabButton label="Horario" value="schedule" activeTab={activeTab} onClick={setActiveTab} />
			</div>

			<div className="p-4 bg-white shadow rounded">
				{activeTab === "info" && <InfoClass schoolClass={schoolClass} currentUserId={davo.id} />}
				{activeTab === "teams" && <p>Lista de equipos de la clase</p>}
				{activeTab === "activities" && <p>Lista de actividades de la clase</p>}
				{activeTab === "schedule" && <p>Horario de la clase</p>}
			</div>
		</div>
	);
}
