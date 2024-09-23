import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/task/AddTaskModal";
import EditTaskData from "@/components/task/EditTaskData";
import TaskList from "@/components/task/TaskList";
import TaskModalDetails from "@/components/task/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
	const { data: user, isLoading: authLoading } = useAuth();
	const navigate = useNavigate();
	const params = useParams();
	const projectId = params.projectId!;

	const { data, isLoading, error } = useQuery({
		queryKey: ["project", projectId],
		queryFn: () => getProjectById(projectId),
		retry: false,
	});
	const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

	if (isLoading && authLoading) {
		return <p className="text-center py-20">Loading...</p>;
	}

	if (error) {
		return <Navigate to={"/404"} />;
	}

	if (data && user) {
		return (
			<>
				<h1 className="text-5xl font-black">{data.projectName}</h1>
				<p className="text-2xl font-light text-gray-500 mt-5"> {data.description}</p>
				{isManager(data.manager, user._id) && (
					<nav className="my-5 flex gap-3">
						<button
							type="button"
							className=" bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
							onClick={() => navigate(`${location.pathname}?newTask=true`)}
						>
							Add task
						</button>
						<Link to={"team"} className=" bg-sky-400 hover:bg-sky-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors">
							Collaborators
						</Link>
					</nav>
				)}
				<TaskList tasks={data.tasks} canEdit={canEdit} />
				<AddTaskModal />
				<EditTaskData />
				<TaskModalDetails />
			</>
		);
	}
}
