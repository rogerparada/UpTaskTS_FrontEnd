import { Link } from "react-router-dom";

export default function DashboardView() {
	return (
		<>
			<h1 className="text-5xl font-black">Projects</h1>
			<p className="text-2xl font-light text-gray-500 mt-5">Manage all your projects</p>
			<nav className="my-5">
				<Link
					to="/projects/create"
					className="bg-blue-500 hover:bg-blue-600 px-10 py-3 text-white font-bold text-xl cursor-pointer transition-colors"
				>
					New Project
				</Link>
			</nav>
		</>
	);
}
