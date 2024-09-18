import { confirmAccount } from "@/api/AuthAPI";
import { ConfirmToken } from "@/types/index";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
	const [token, setToken] = useState<ConfirmToken["token"]>("");
	const { mutate } = useMutation({
		mutationFn: confirmAccount,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
		},
	});

	const handleChange = (token: ConfirmToken["token"]) => {
		setToken(token);
	};
	const handleComplete = (token: ConfirmToken["token"]) => {
		mutate(token);
	};

	return (
		<>
			<h1 className="text-5xl font-black text-white">Confirm your account</h1>
			<p className="text-2xl font-light text-white mt-5">
				Please, enter the code sent
				<span className=" text-sky-400 font-bold"> by email</span>
			</p>
			<form className="space-y-8 p-10 bg-white mt-10">
				<label className="font-normal text-2xl text-center block">6 digits code</label>
				<div className="flex justify-center gap-5">
					<PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
						<PinInputField className="border border-gray-300 w-10 h-10 placeholder-white rounded-lg text-center font-bold" />
						<PinInputField className="border border-gray-300 w-10 h-10 placeholder-white rounded-lg text-center font-bold" />
						<PinInputField className="border border-gray-300 w-10 h-10 placeholder-white rounded-lg text-center font-bold" />
						<PinInputField className="border border-gray-300 w-10 h-10 placeholder-white rounded-lg text-center font-bold" />
						<PinInputField className="border border-gray-300 w-10 h-10 placeholder-white rounded-lg text-center font-bold" />
						<PinInputField className="border border-gray-300 w-10 h-10 placeholder-white rounded-lg text-center font-bold" />
					</PinInput>
				</div>
			</form>

			<nav className="mt-10 flex flex-col space-y-4">
				<Link to="/auth/request-code" className="text-center text-gray-300 font-normal">
					Request a new code
				</Link>
			</nav>
		</>
	);
}
