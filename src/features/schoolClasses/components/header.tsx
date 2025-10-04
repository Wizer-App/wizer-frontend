import { BookOpen, School, UserRound, Users, WandSparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
	const location = useLocation();

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	return (
		<header className="bg-white px-20 py-4 ">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 ">
					<Link to="/">
						<h1 className="text-xl font-semibold text-blue-500 flex items-center gap-2"><WandSparkles size={18} /> W I Z E R</h1>
					</Link>
				</div>

				<nav className="flex items-center gap-8">
					<Link
						to="/schoolclasses"
						className={`text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-3 rounded-xl flex items-center gap-2 transition-all duration-200 hover:shadow-md ${isActive('/schoolclasses') ? 'bg-blue-500 text-white' : ''
							}`}
					>
						<School size={20} />
						Mis clases
					</Link>
					<Link
						to="/teams"
						className={`text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-3 rounded-xl flex items-center gap-2 transition-all duration-200 hover:shadow-md ${isActive('/teams') ? 'bg-blue-500 text-white' : ''
							}`}
					>
						<Users size={20} />
						Equipos
					</Link>
					<Link
						to="/activities"
						className={`text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-3 rounded-xl flex items-center gap-2 transition-all duration-200 hover:shadow-md ${isActive('/activities') ? 'bg-blue-500 text-white' : ''
							}`}
					>
						<BookOpen size={20} />
						Actividades
					</Link>
				</nav>

				<div className="flex items-center gap-4">
					<button className="group bg-blue-500 p-3 rounded-3xl hover:bg-gray-200 transition-colors duration-200">
						<UserRound size={20} className="text-white group-hover:text-black transition-colors duration-200" />
					</button>
				</div>
			</div>
		</header>
	);
}