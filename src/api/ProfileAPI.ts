import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { UpdateCurrentPasswordForm, UserProfileFormData } from "../types";

export async function updateProfile(formData: UserProfileFormData) {
	try {
		const { data } = await api.put<string>("/auth/profile", formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function updatePassword(formData: UpdateCurrentPasswordForm) {
	try {
		const { data } = await api.post<string>("/auth/update-password", formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}
