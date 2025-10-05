import { BookOpen, School, UserRound, Users, WandSparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type NavLinkItemProps = {
	to: string;
	icon: React.ReactNode;
	label: string;
	isActive: boolean;
};

const NavLinkItem = ({ to, icon, label, isActive }: NavLinkItemProps) => {
	return (
		<Link
			to={to}
			className={`text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-3 rounded-xl flex items-center gap-2 transition-all duration-200 hover:shadow-md ${isActive ? 'bg-blue-500 text-white' : ''
				}`}
		>
			{icon}
			{label}
		</Link>
	);
};

export default function Header() {
	const location = useLocation();
	const isActive = (path: string) => location.pathname === path;

	return (
		<header className="fixed top-0 left-0 w-full z-50 bg-white px-20 py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Link to="/">
						<h1 className="text-xl font-semibold text-blue-500 flex items-center gap-2">
							<WandSparkles size={18} /> W I Z E R
						</h1>
					</Link>
				</div>

				<nav className="flex items-center gap-8">
					<NavLinkItem to="/schoolclasses" icon={<School size={20} />} label="Mis clases" isActive={isActive("/schoolclasses")} />
					<NavLinkItem to="/teams" icon={<Users size={20} />} label="Equipos" isActive={isActive("/teams")} />
					<NavLinkItem to="/activities" icon={<BookOpen size={20} />} label="Actividades" isActive={isActive("/activities")} />
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
