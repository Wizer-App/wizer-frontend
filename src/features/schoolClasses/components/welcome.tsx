import { useState, useEffect } from "react";
import { davo } from "../userTest";

export default function Welcome() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	const today = time.toLocaleDateString("es-ES", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const currentTime = time.toLocaleTimeString("es-ES", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<div className="py-3">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-3xl font-bold">
					Bienvenido, {davo.name} {davo.lastName}
				</h1>
				<span className="">{currentTime}</span>
			</div>
			<p>{today}</p>
		</div>
	);
}