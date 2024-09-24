import { Link } from "react-router-dom";

export default function NotFoundView() {
	return (
		<>
			<h1 className="font-black text-center text-4xl text-white">Page Not Found</h1>
			<h1 className="font-black text-center text-6xl text-white mt-10">404</h1>
			<p className="mt-10 text-center text-white text-xl">
				Go back to&nbsp;
				<Link className="text-sky-500" to={"/"}>
					Projects
				</Link>
			</p>
		</>
	);
}
