import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/index";
import { findMemberByEmail } from "@/api/TeamAPI";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
	const initialValues: TeamMemberForm = {
		email: "",
	};
	const params = useParams();
	const projectId = params.projectId!;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const mutation = useMutation({
		mutationFn: findMemberByEmail,
	});

	const handleSearchUser = async (formData: TeamMemberForm) => {
		const data = { projectId, formData };
		mutation.mutate(data);
	};

	const resetData = () => {
		reset();
		mutation.reset();
	};

	return (
		<>
			<form className="mt-10 space-y-5" onSubmit={handleSubmit(handleSearchUser)} noValidate>
				<div className="flex flex-col gap-3">
					<label className="font-normal text-2xl" htmlFor="name">
						User email
					</label>
					<input
						id="name"
						type="text"
						placeholder="User email to add"
						className="w-full p-3  border-gray-300 border"
						{...register("email", {
							required: "The email is required",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "Email not valid",
							},
						})}
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<input
					type="submit"
					className=" bg-sky-400 hover:bg-sky-500 w-full p-3  text-white font-black  text-xl cursor-pointer"
					value="Buscar Usuario"
				/>
			</form>

			<div className="mt-10 text-center">
				{mutation.isPending && <p>Loading...</p>}
				{mutation.isError && <p className="text-white bg-red-600 p-3 font-bold">{mutation.error.message}</p>}
				{mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
			</div>
		</>
	);
}
