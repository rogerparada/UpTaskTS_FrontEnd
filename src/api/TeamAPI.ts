import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, TeamMember, TeamMemberForm, teamsMemberSchema } from "../types";

export async function findMemberByEmail({ projectId, formData }: { projectId: Project["_id"]; formData: TeamMemberForm }) {
	try {
		const url = `/projects/${projectId}/team/find`;
		const { data } = await api.post<TeamMember>(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function addMemberById({ projectId, id }: { projectId: Project["_id"]; id: TeamMember["_id"] }) {
	try {
		const url = `/projects/${projectId}/team`;
		const { data } = await api.post<string>(url, { id });
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}
export async function getProjectTeam(projectId: Project["_id"]) {
	try {
		const url = `/projects/${projectId}/team`;
		const { data } = await api(url);
		const result = teamsMemberSchema.safeParse(data);
		if (result.success) {
			return result.data;
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}

export async function removeUserFomProject({ projectId, id }: { projectId: Project["_id"]; id: TeamMember["_id"] }) {
	try {
		const url = `/projects/${projectId}/team/${id}`;
		const { data } = await api.delete<string>(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
	}
}
