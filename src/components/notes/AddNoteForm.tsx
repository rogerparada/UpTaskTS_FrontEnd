import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export default function AddNoteForm() {
	const params = useParams();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const projectId = params.projectId!;
	const taskId = queryParams.get("viewTask")!;
	const queryClient = useQueryClient();
	const initialValues: NoteFormData = {
		content: "",
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });
	const { mutate } = useMutation({
		mutationFn: createNote,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ["task", taskId] });
			reset();
		},
	});

	const handleAddNote = (formData: NoteFormData) => {
		const data = {
			projectId,
			taskId,
			formData,
		};
		mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(handleAddNote)} className="space-y-3" noValidate>
			<div className="flex flex-col gap-2">
				<label className="font-bold" htmlFor="content">
					Create note:
				</label>
				<input
					id="content"
					type="text"
					placeholder="Content"
					className="w-full p-3 border border-gray-300"
					{...register("content", { required: "THe content is required" })}
				/>
			</div>
			{errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
			<input type="submit" value="Save note" className="bg-sky-500 hover:bg-sky-600 text-white p-2 font-bold w-full" />
		</form>
	);
}
