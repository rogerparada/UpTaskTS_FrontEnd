import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
	const initialValues: UserLoginForm = {
		email: "",
		password: "",
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: login,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
		},
	});

	const handleLogin = (formData: UserLoginForm) => mutate(formData);

	return (
		<>
			<form onSubmit={handleSubmit(handleLogin)} className="space-y-8 p-10 bg-white" noValidate>
				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl">Email</label>

					<input
						id="email"
						type="email"
						placeholder="Registered email"
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

				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl">Password</label>

					<input
						type="password"
						placeholder="Registered password"
						className="w-full p-3  border-gray-300 border"
						{...register("password", {
							required: "The Password is required",
						})}
					/>
					{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
				</div>

				<input type="submit" value="Login" className="bg-sky-400 hover:bg-sky-500 w-full p-3  text-white font-black  text-xl cursor-pointer" />
			</form>

			<nav className="mt-10 flex flex-col space-y-4">
				<Link to={"/auth/register"} className="text-white text-center">
					Don't have an account? Sign up here.
				</Link>
				<Link to="/auth/forgot-password" className="text-center text-gray-300 font-normal">
					Did you forgot your password? Reset it here
				</Link>
			</nav>
		</>
	);
}
