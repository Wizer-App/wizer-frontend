import { useState, useCallback } from "react";
import { useWizerHub } from "../../hooks/useWizerHub";

type ChatProps = {
	classId: number;
	currentUserId: string | number;
};

export default function Chat({ classId, currentUserId }: ChatProps) {
	const [joinedUsers, setJoinedUsers] = useState<(string | number)[]>([]);

	// ✅ Callback cuando alguien se une
	const handleUserJoined = useCallback((userId: string | number) => {
		setJoinedUsers(prev => prev.includes(userId) ? prev : [...prev, userId]);
	}, []);

	// ✅ Callback cuando alguien sale
	const handleUserLeft = useCallback((userId: string | number) => {
		setJoinedUsers(prev => prev.filter(id => id !== userId));
	}, []);

	const { connected } = useWizerHub(classId, currentUserId, handleUserJoined, handleUserLeft);

	return (
		<div className="mt-4 bg-white rounded-md p-3 h-[500px] flex flex-col shadow overflow-y-auto">
			<h2 className="text-lg font-semibold mb-2">Chat del Curso</h2>

			<p className={`text-sm mb-2 ${connected ? "text-green-600" : "text-red-500"}`}>
				{connected ? "🟢 Conectado al chat" : "🔴 Desconectado"}
			</p>

			<div className="flex-1 flex flex-col gap-1">
				{joinedUsers.length === 0 && (
					<p className="text-gray-400 text-sm italic">No hay usuarios conectados aún</p>
				)}
				{joinedUsers.map((userId, i) => (
					<div key={i} className="text-gray-700 italic text-sm">
						👋 Usuario {userId} se unió
					</div>
				))}
			</div>
		</div>
	);
}