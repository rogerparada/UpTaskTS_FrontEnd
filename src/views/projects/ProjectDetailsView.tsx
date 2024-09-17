import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/task/AddTaskModal";
import EditTaskData from "@/components/task/EditTaskData";
import TaskList from "@/components/task/TaskList";
import TaskModalDetails from "@/components/task/TaskModalDetails";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
	const navigate = useNavigate();
	const params = useParams();
	const projectId = params.projectId!;

	const { data, isLoading, error } = useQuery({
		queryKey: ["project", projectId],
		queryFn: () => getProjectById(projectId),
		retry: false,
	});

	if (isLoading) {
		return <p className="text-center py-20">Loading...</p>;
	}

	if (error) {
		return <Navigate to={"/404"} />;
	}

	if (data) {
		return (
			<>
				<h1 className="text-5xl font-black">{data.projectName}</h1>
				<p className="text-2xl font-light text-gray-500 mt-5"> {data.description}</p>
				<nav className="my-5 flex gap-3">
					<button
						type="button"
						className=" bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
						onClick={() => navigate(`${location.pathname}?newTask=true`)}
					>
						Add task
					</button>
				</nav>
				<TaskList tasks={data.tasks} />
				<AddTaskModal />
				<EditTaskData />
				<TaskModalDetails />
			</>
		);
	}
}
