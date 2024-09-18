import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {
	const initialValues: RequestConfirmationCodeForm = {
		email: "",
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: requestConfirmationCode,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData);

	return (
		<>
			<h1 className="text-5xl font-black text-white">Request a new confirmation code</h1>

			<form onSubmit={handleSubmit(handleRequestCode)} className="space-y-8 p-10 rounded-lg bg-white mt-10" noValidate>
				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl" htmlFor="email">
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Email registered"
						className="w-full p-3 rounded-lg border-gray-300 border"
						{...register("email", {
							required: "The register email is required",
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
					value="Send Code"
					className="bg-sky-400 hover:bg-sky-500 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
				/>
			</form>

			<nav className="mt-10 flex flex-col space-y-4">
				<Link to="/auth/login" className="text-center text-gray-300 font-normal">
					Did you have an account? Login here
				</Link>
				<Link to="/auth/forgot-password" className="text-center text-gray-300 font-normal">
					Did you forgot your password? Reset it here
				</Link>
			</nav>
		</>
	);
}
