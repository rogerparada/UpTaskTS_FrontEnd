import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
	const initialValues: ForgotPasswordForm = {
		email: "",
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: forgotPassword,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData);

	return (
		<>
			<h1 className="text-5xl font-black text-white">Reset Password</h1>
			<form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-8 p-10  bg-white mt-10" noValidate>
				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl" htmlFor="email">
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Registered Email"
						className="w-full p-3  border-gray-300 border"
						{...register("email", {
							required: "The registered email is required",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "E-mail no válido",
							},
						})}
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<input
					type="submit"
					value="Send instructions"
					className="bg-sky-400 hover:bg-sky-500 w-full p-3  text-white font-black  text-xl cursor-pointer"
				/>
			</form>

			<nav className="mt-10 flex flex-col space-y-4">
				<Link to={"/auth/login"} className="text-white text-center">
					Do you have an account? Login here.
				</Link>

				<Link to={"/auth/register"} className="text-white text-center">
					Don't have an account? Sign up here.
				</Link>
			</nav>
		</>
	);
}
