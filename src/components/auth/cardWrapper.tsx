'use client';

import { ReactNode } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Header } from '@/components/auth/header';
import { BackButton } from '@/components/auth/backButton';

interface CardWrapperProps {
	children: ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}

export const CardWrapper = ({ children, headerLabel, backButtonHref, backButtonLabel, showSocial }: CardWrapperProps) => {
	return (
		<Card className='w-[400px] shadow-md'>
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
			<CardFooter>
				<BackButton
					label={backButtonLabel}
					href={backButtonHref}
				/>
			</CardFooter>
		</Card>
	);
};