import NextAuth from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from "@/lib/db";
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { getAccountByUserId } from '@/data/account';
import { UserRole } from '@prisma/client';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error'
	},
	callbacks: {
		async signIn({ user, account }) {
			console.log({
				user,
				account
			});

			// Вход через гугол и гитхаб
			if (account?.provider !== 'credentials') return true;

			const existingUser = await getUserById(user.id);

			// Запрет на вход без верификации
			// if (!existingUser?.emailVerified) return false;


			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole;
			}


			if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email as string;
				session.user.isOAuth = token.isOAuth as boolean;
			}

			return session;
		},
		async jwt({ token }) {

			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;

			const existingAccount = await getAccountByUserId(existingUser.id);

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.role = existingUser.role;

			return token;
		}
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
})