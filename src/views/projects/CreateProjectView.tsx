import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {
	const navigate = useNavigate();
	const { mutate } = useMutation({
		mutationFn: createProject,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			navigate("/");
		},
	});

	const initialValues: ProjectFormData = {
		projectName: "",
		clientName: "",
		description: "",
	};

	const handleForm = (formData: ProjectFormData) => mutate(formData);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });
	return (
		<>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-5xl font-black">Create a Project</h1>
				<p className="text-2xl font-light text-gray-500 mt-5">Fill out the following form to create a new project.</p>
				<nav className="my-5">
					<Link to="/" className="bg-blue-500 hover:bg-blue-600 px-10 py-3 text-white font-bold text-xl cursor-pointer transition-colors">
						Back to Projects
					</Link>
				</nav>

				<form className="mt-10 bg-white shadow-lg p-10" onSubmit={handleSubmit(handleForm)} noValidate>
					<ProjectForm register={register} errors={errors} />
					<input
						type="submit"
						value="Create project"
						className="bg-sky-400 hover:bg-sky-600 transition-colors w-full p-3 text-white uppercase font-bold cursor-pointer"
					/>
				</form>
			</div>
		</>
	);
}
