import { getProjectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function EditProjectView() {
	const params = useParams();
	const projectId = params.projectId!;

	const { data, isLoading, error } = useQuery({
		queryKey: ["editProject", projectId],
		queryFn: () => getProjectById(projectId),
		retry: false,
		enabled: !!projectId,
	});

	if (isLoading) {
		return <p className="text-center py-20">Loading...</p>;
	}

	if (error) {
		return <Navigate to={"/404"} />;
	}

	if (data) {
		return <EditProjectForm data={data} projectId={projectId} />;
	}
}
