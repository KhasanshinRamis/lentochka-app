import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';


export const POST = async (req: NextRequest) => {

	const body = await req.json();

	const validatedFields = LoginSchema.safeParse(body);

	if (!validatedFields.success) {
		return NextResponse.json({ error: "Invalid fields!" }, { status: 401, statusText: 'Invalid fields!' });
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return NextResponse.json({ error: "Email does not exist!" }, { status: 401, statusText: 'Email does not exist!' });
	};



	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});

		return NextResponse.json({ success: "Success" }, { status: 200, statusText: 'Success!' });
	} catch (error: any) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return NextResponse.json({ error: "Invalid credentials!" }, { status: 401, statusText: "Invalid credentials!" });
				default:
					return NextResponse.json({ error: "Something went wrong!" }, { status: 401, statusText: "Something went wrong!" });
			}
		}

		throw error;
	}
};