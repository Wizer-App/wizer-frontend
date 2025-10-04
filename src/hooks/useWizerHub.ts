import { useEffect, useRef, useState, useCallback } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

interface UserJoinedPayload {
	userId: string;
	classId: number;
}

interface ClassMessagePayload {
	user: string;
	message: string;
}

export function useWizerHub(classId: number | string | null) {
	const connectionRef = useRef<HubConnection | null>(null);
	const [connected, setConnected] = useState(false);
	const [userJoinedEvents, setUserJoinedEvents] = useState<UserJoinedPayload[]>([]);
	const [messages, setMessages] = useState<ClassMessagePayload[]>([]);

	useEffect(() => {
		if (!classId) return;

		const conn = new HubConnectionBuilder()
			.withUrl('http://localhost:5285/hubs/wizer')
			.withAutomaticReconnect()
			.configureLogging(LogLevel.Information)
			.build();

		connectionRef.current = conn;

		// 🎯 Escuchar cuando un usuario se une (coincide con el Hub)
		conn.on('UserJoined', (userId: string) => {
			setUserJoinedEvents(prev => [...prev, {
				userId,
				classId: Number(classId)
			}]);
		});

		// 🎯 Escuchar mensajes de la clase
		conn.on('ReceiveClassMessage', (payload: { User: string; Message: string }) => {
			setMessages(prev => [...prev, {
				user: payload.User,
				message: payload.Message
			}]);
		});

		// 🚀 Iniciar conexión y unirse a la clase
		conn.start()
			.then(() => {
				console.log('✅ Conectado a SignalR');
				setConnected(true);
				return conn.invoke('JoinClass', Number(classId));
			})
			.then(() => {
				console.log(`✅ Unido a la clase ${classId}`);
			})
			.catch(err => {
				console.error('❌ Error en SignalR:', err);
				setConnected(false);
			});

		// 🧹 Cleanup
		return () => {
			conn.stop().catch(() => { });
			connectionRef.current = null;
			setConnected(false);
		};
	}, [classId]);

	const sendClassMessage = useCallback(async (message: string) => {
		if (!connectionRef.current || !connected) {
			console.warn('⚠️ No conectado a SignalR');
			return;
		}
		try {
			await connectionRef.current.invoke('SendClassMessage', Number(classId), message);
		} catch (err) {
			console.error('❌ Error al enviar mensaje:', err);
		}
	}, [classId, connected]);

	return {
		connected,
		userJoinedEvents,
		messages,
		sendClassMessage,
		connection: connectionRef.current
	};
}