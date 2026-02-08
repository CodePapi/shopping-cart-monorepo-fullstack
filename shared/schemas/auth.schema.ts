import { z } from "zod";

export const UserRoleSchema = z.enum(["ADMIN", "CUSTOMER"]);

export const UserSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	role: UserRoleSchema,
	createdAt: z.string().pipe(z.coerce.date()),
	updatedAt: z.string().pipe(z.coerce.date()),
});

export const RegisterSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	role: UserRoleSchema.optional(),
});

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const AuthResponseSchema = z.object({
	token: z.string().min(1),
	user: UserSchema,
});

export type UserRole = z.infer<typeof UserRoleSchema>;
export type User = z.infer<typeof UserSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
