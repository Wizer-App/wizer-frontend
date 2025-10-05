import { useEffect, useRef, useState } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

type UserJoinedCallback = (userId: string | number) => void;
type UserLeftCallback = (userId: string | number) => void;

export function useWizerHub(
	classId: number | string | null,
	currentUserId: string | number,
	onUserJoined?: UserJoinedCallback,
	onUserLeft?: UserLeftCallback
) {
	const connectionRef = useRef<HubConnection | null>(null);
	const [connected, setConnected] = useState(false);

	// ✅ Usar useRef para mantener las referencias actualizadas sin causar re-renders
	const onUserJoinedRef = useRef(onUserJoined);
	const onUserLeftRef = useRef(onUserLeft);

	useEffect(() => {
		onUserJoinedRef.current = onUserJoined;
		onUserLeftRef.current = onUserLeft;
	}, [onUserJoined, onUserLeft]);

	useEffect(() => {
		if (!classId) return;

		const conn = new HubConnectionBuilder()
			.withUrl("http://localhost:5285/hubs/wizer")
			.withAutomaticReconnect()
			.configureLogging(LogLevel.Information)
			.build();

		connectionRef.current = conn;

		// Escuchar cuando un usuario se une
		conn.on("UserJoined", (payload: any) => {
			const userId = typeof payload === "object" && payload !== null ? payload.userId : payload;

			if (userId && userId !== currentUserId) {
				console.log("🔔 Usuario se unió:", userId);
				if (onUserJoinedRef.current) {
					onUserJoinedRef.current(userId);
				}
			}
		});

		// ✅ Escuchar cuando un usuario sale
		conn.on("UserLeft", (payload: any) => {
			console.log("🔴 UserLeft recibido:", payload);
			const userId = typeof payload === "object" && payload !== null ? payload.userId : payload;

			console.log("👋 Usuario salió:", userId, "| Usuario actual:", currentUserId);

			// ⚠️ TEMPORALMENTE quita el filtro para ver si llegan los eventos
			if (userId) {
				if (onUserLeftRef.current) {
					onUserLeftRef.current(userId);
				}
			}
		});

		conn.start()
			.then(() => {
				setConnected(true);
				return conn.invoke("JoinClass", Number(classId));
			})
			.catch(err => {
				console.error("❌ Error en SignalR:", err);
				setConnected(false);
			});

		return () => {
			// ✅ Notificar al servidor que estamos saliendo antes de desconectar
			const cleanup = async () => {
				try {
					if (conn.state === "Connected") {
						await conn.invoke("LeaveClass", Number(classId));
					}
				} catch (error) {
					console.warn("Error al salir de la clase:", error);
				} finally {
					try {
						await conn.stop();
					} catch (error) {
						console.warn("Error al detener conexión:", error);
					}
				}
			};

			cleanup();
			connectionRef.current = null;
			setConnected(false);
		};
	}, [classId, currentUserId]);

	return { connected };
}