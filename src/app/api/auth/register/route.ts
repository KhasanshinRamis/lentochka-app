import * as z from 'zod';
import bcrypt from "bcryptjs";
import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/data/user';


export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();
		const validatedFields = RegisterSchema.safeParse(body);

		if (!validatedFields.success) {
			return NextResponse.json({ error: 'Invalidated!' }, { status: 401, statusText: 'Invalidated!' });
		};

		const { email, password, name, nickname } = validatedFields.data;
		const hashedPassword = await bcrypt.hash(password, 10);
		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return NextResponse.json({ error: 'Email already in use!' }, { status: 401, statusText: 'Email already in use!' });
		};


		const userCreate = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			}
		})

		const userUpdate = await db.user.update({
			where: {
				id: userCreate.id
			},
			data: {
				nickname
			}
		})


		return NextResponse.json({ success: 'Success! User create!' }, { status: 200 });;

	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};