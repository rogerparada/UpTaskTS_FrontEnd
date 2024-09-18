import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import ErrorMessage from "@/components/ErrorMessage";

type NewPasswordFormProps = {
	token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
	const navigate = useNavigate();
	const initialValues: NewPasswordForm = {
		password: "",
		password_confirmation: "",
	};
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: updatePasswordWithToken,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
			navigate("/auth/login");
		},
	});

	const handleNewPassword = (formData: NewPasswordForm) => mutate({ formData, token });

	const password = watch("password");

	return (
		<>
			<form onSubmit={handleSubmit(handleNewPassword)} className="space-y-8 p-10  bg-white mt-10" noValidate>
				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl">Password</label>

					<input
						type="password"
						placeholder="Password"
						className="w-full p-3  border-gray-300 border"
						{...register("password", {
							required: "The password is required",
							minLength: {
								value: 8,
								message: "The password must have at least 8 characters",
							},
						})}
					/>
					{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
				</div>

				<div className="flex flex-col gap-5">
					<label className="font-normal text-2xl">Repetir Password</label>

					<input
						id="password_confirmation"
						type="password"
						placeholder="Repeat password"
						className="w-full p-3  border-gray-300 border"
						{...register("password_confirmation", {
							required: "Please repeat your password",
							validate: (value) => value === password || "Los Passwords no son iguales",
						})}
					/>

					{errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
				</div>

				<input type="submit" value="Set Password" className="bg-sky-400 hover:bg-sky-500 w-full p-3  text-white font-black  text-xl cursor-pointer" />
			</form>
		</>
	);
}
