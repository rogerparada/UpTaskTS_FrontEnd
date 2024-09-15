import { ProjectFormData } from "@/types/index";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
	data: ProjectFormData;
	projectId: string;
};

export default function EditProjectForm({ data, projectId }: EditProjectFormProps) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: updateProject,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
			toast.success(data);
			navigate("/");
		},
	});
	const handleForm = (formData: ProjectFormData) => {
		const data = {
			formData,
			projectId,
		};
		mutate(data);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			projectName: data.projectName,
			clientName: data.clientName,
			description: data.description,
		},
	});
	return (
		<>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-5xl font-black">Edit Project</h1>
				<p className="text-2xl font-light text-gray-500 mt-5">Fill out the following form to edit an existing project.</p>
				<nav className="my-5">
					<Link to="/" className="bg-blue-500 hover:bg-blue-600 px-10 py-3 text-white font-bold text-xl cursor-pointer transition-colors">
						Back to Projects
					</Link>
				</nav>

				<form className="mt-10 bg-white shadow-lg p-10" onSubmit={handleSubmit(handleForm)} noValidate>
					<ProjectForm register={register} errors={errors} />
					<input
						type="submit"
						value="Save project"
						className="bg-sky-400 hover:bg-sky-600 transition-colors w-full p-3 text-white uppercase font-bold cursor-pointer"
					/>
				</form>
			</div>
		</>
	);
}
