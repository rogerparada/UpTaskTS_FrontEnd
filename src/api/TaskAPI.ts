import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

type TaskAPI = {
	projectId: Project["_id"];
	formData: TaskFormData;
	taskId: Task["_id"];
	status: Task["status"];
};

export async function createTask({ formData, projectId }: Pick<TaskAPI, "formData" | "projectId">) {
	try {
		const url = `/projects/${projectId}/tasks`;
		const { data } = await api.post<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function getTaskById({ projectId, taskId }: Pick<TaskAPI, "taskId" | "projectId">) {
	try {
		const url = `/projects/${projectId}/tasks/${taskId}`;
		const { data } = await api(url);
		const result = taskSchema.safeParse(data);
		if (result.success) {
			console.log(result.data);
			return result.data;
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function updateTask({ projectId, taskId, formData }: Pick<TaskAPI, "projectId" | "taskId" | "formData">) {
	try {
		const url = `/projects/${projectId}/tasks/${taskId}`;
		const { data } = await api.put<string>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function deleteTask({ projectId, taskId }: Pick<TaskAPI, "taskId" | "projectId">) {
	try {
		const url = `/projects/${projectId}/tasks/${taskId}`;
		const { data } = await api.delete<string>(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function updateTaskStatus({ projectId, taskId, status }: Pick<TaskAPI, "taskId" | "projectId" | "status">) {
	try {
		const url = `/projects/${projectId}/tasks/${taskId}/status`;
		const { data } = await api.post<string>(url, { status });
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}
