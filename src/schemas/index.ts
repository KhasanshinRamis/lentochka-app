import { UserRole } from '@prisma/client';
import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Заполните поле email!",
	}),
	password: z.string().min(1, {
		message: "Заполните поле пароль!",
	}),
});

export const RegisterSchema = z.object({
	email: z.string().email({
		message: "Заполните поле email!",
	}),
	password: z.string().min(6, {
		message: "Минимум 6 символов в поле пароль!",
	}),
	name: z.string().min(1, {
		message: 'Заполните поле ФИО!'
	}),
	nickname: z.string().min(1, {
		message: 'Заполните поле псевдоним!',

	})
});

