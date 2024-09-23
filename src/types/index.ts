import { z } from "zod";

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const authSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	password_confirmation: z.string(),
	token: z.string(),
});

export const userSchema = authSchema
	.pick({
		name: true,
		email: true,
	})
	.extend({
		_id: z.string(),
	});

export const taskSchema = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string(),
	project: z.string(),
	status: taskStatusSchema,
	completedBy: z.array(
		z.object({
			_id: z.string(),
			user: userSchema,
			status: taskStatusSchema,
		})
	),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const projectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
	tasks: z.array(taskSchema),
	manager: z.string(),
});

export const dashBoardProjectSchema = z.array(
	projectSchema.pick({
		_id: true,
		projectName: true,
		clientName: true,
		description: true,
		manager: true,
	})
);

export type Auth = z.infer<typeof authSchema>;
export type User = z.infer<typeof userSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Task = z.infer<typeof taskSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<Auth, "email" | "password" | "name" | "password_confirmation">;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type ConfirmToken = Pick<Auth, "token">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;

export type ProjectFormData = Pick<Project, "projectName" | "clientName" | "description">;
export type TaskFormData = Pick<Task, "name" | "description">;

export const teamMemberSchema = userSchema.pick({
	name: true,
	email: true,
	_id: true,
});

export const teamsMemberSchema = z.array(teamMemberSchema);

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;
