import NextAuth, { DefaultSession } from 'next-auth';
import { UserRole } from '@prisma/client';

export type ExtendedUser = DefaultSession['user'] & {
	role: UserRole;
	isOAuth: boolean;
	nickname: string;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	};
};
