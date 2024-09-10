import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from "../../types";

type ProjectFormProperties = {
	register: UseFormRegister<ProjectFormData>;
	errors: FieldErrors<ProjectFormData>;
};

export default function ProjectForm({ register, errors }: ProjectFormProperties) {
	return (
		<>
			<div className="mb-5 space-y-3">
				<label htmlFor="projectName" className="text-sm uppercase font-bold">
					Project name
				</label>
				<input
					id="projectName"
					className="w-full p-3  border border-gray-200"
					type="text"
					placeholder="Project name"
					{...register("projectName", {
						required: "The project name is required",
					})}
				/>

				{errors.projectName && <ErrorMessage>{errors.projectName.message}</ErrorMessage>}
			</div>

			<div className="mb-5 space-y-3">
				<label htmlFor="clientName" className="text-sm uppercase font-bold">
					Client name
				</label>
				<input
					id="clientName"
					className="w-full p-3  border border-gray-200"
					type="text"
					placeholder="Client name"
					{...register("clientName", {
						required: "The client name is required",
					})}
				/>

				{errors.clientName && <ErrorMessage>{errors.clientName.message}</ErrorMessage>}
			</div>

			<div className="mb-5 space-y-3">
				<label htmlFor="description" className="text-sm uppercase font-bold">
					Description
				</label>
				<textarea
					id="description"
					className="w-full p-3  border border-gray-200"
					placeholder="Project description"
					{...register("description", {
						required: "The description is required",
					})}
				/>

				{errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
			</div>
		</>
	);
}
