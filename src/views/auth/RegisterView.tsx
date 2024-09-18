import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
	const initialValues: UserRegistrationForm = {
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	};

	const { mutate } = useMutation({
		mutationFn: createAccount,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<UserRegistrationForm>({ defaultValues: initialValues });

	const password = watch("password");

	const handleRegister = (formData: UserRegistrationForm) => {
		mutate(formData);
	};

	return (
		<>
			<h1 className="text-5xl font-black text-white">Create Account</h1>
			<p className="text-xl font-light text-white mt-5">
				Fill out the following form to {""}
				<span className=" text-sky-300 font-bold"> create your account</span>
			</p>

			<form onSubmit={handleSubmit(handleRegister)} className="space-y-8 p-10  bg-white mt-10" noValidate>
				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl" htmlFor="email">
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Register email"
						className="w-full p-3  border-gray-300 border"
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

				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl">Name</label>
					<input
						type="name"
						placeholder="Register name"
						className="w-full p-3  border-gray-300 border"
						{...register("name", {
							required: "The name is required",
						})}
					/>
					{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
				</div>

				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl">Password</label>

					<input
						type="password"
						placeholder="Register Password"
						className="w-full p-3  border-gray-300 border"
						{...register("password", {
							required: "The Password is required",
							minLength: {
								value: 8,
								message: "The Password must have at least 8 characters.",
							},
						})}
					/>
					{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
				</div>

				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl">Repeat password</label>

					<input
						id="password_confirmation"
						type="password"
						placeholder="Repeat password"
						className="w-full p-3  border-gray-300 border"
						{...register("password_confirmation", {
							required: "Please repeat the password",
							validate: (value) => value === password || "Passwords mismatch",
						})}
					/>

					{errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
				</div>

				<input type="submit" value="Register" className="bg-sky-400 hover:bg-sky-500 w-full p-3  text-white font-black  text-xl cursor-pointer" />
			</form>

			<nav className="mt-10 flex flex-col space-y-4">
				<Link to={"/auth/login"} className="text-white text-center">
					Do you have an account? Login here.
				</Link>
				<Link to="/auth/forgot-password" className="text-center text-gray-300 font-normal">
					Did you forgot your password? Reset it here
				</Link>
			</nav>
		</>
	);
}
