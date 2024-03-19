'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardWrapper } from '@/components/auth/cardWrapper';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { LoginSchema } from '@/schemas';
import { FormError } from '@/components/formError';
import { FormSuccess } from '@/components/formSuccess';


export const LoginForm = () => {

	const searchParams = useSearchParams();


	const [errorMessage, setErrorMessage] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string>('');

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});


	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setErrorMessage('');
		setSuccess('');

	};


	return (
		<CardWrapper
			headerLabel='С возвращением'
			backButtonLabel='У вас нет учетной записи?'
			backButtonHref='/auth/register'
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'
				>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='ivanovivan@example.com'
											type='email'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='******'
											type='password'
										/>
									</FormControl>
									<Button
										size='sm'
										variant='link'
										asChild
										className='px-0 font-normal'
									>
										<Link href='/auth/reset'>
											Забыли пароль?
										</Link>
									</Button>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={errorMessage} />
					<FormSuccess message={success} />
					<Button
						type='submit'
						className='w-full'
					>
						Войти
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};