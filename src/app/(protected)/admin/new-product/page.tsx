'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewProductSchema } from '@/schemas';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { FaFileImage } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/config/firebase';
import productService from '@/services/productService';
import { Button } from '@/components/ui/button';
import { Tiptap } from '@/components/ui/tiptap';


export default function NewProduct() {
	

	const [media, setMedia] = useState<string>('');
	const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer>();
	const [disabledFromMedia, setDisabledFromMedia] = useState<boolean>(false);

	useEffect(() => {
		const storage = getStorage(app);
		const upload = () => {
			if (file) {

				const name = new Date().getTime().toString();
				const storageRef = ref(storage, name);

				const uploadTask = uploadBytesResumable(storageRef, file);

				uploadTask.on(
					"state_changed",
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log("Upload is " + progress + "% done");
						switch (snapshot.state) {
							case "paused":
								console.log("Upload is paused");
								break;
							case "running":
								console.log("Upload is running");
								break;
						}
					},
					(error) => { console.log(error.message) },
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							setMedia(downloadURL);
							setDisabledFromMedia(true);
							console.log('File available at', downloadURL);
						});
					}
				);
			}
		};

		file && upload();
	}, [file]);

	const form = useForm<z.infer<typeof NewProductSchema>>({
		resolver: zodResolver(NewProductSchema)
	});

	const mutation = useMutation({
		mutationKey: ['new-post'],
		mutationFn: (values: z.infer<typeof NewProductSchema>) => productService.create(values),
		onSuccess: (data: any) => {
			console.log('Success!', data);
			console.log(data.success);
			toast.success('Новая запись создана!');
			form.reset();
		},
		onError: (error: any) => {
			console.log(error.message);
			toast.error(error.response.data.error);
		}
	});

	const slugify = (str: string) => str.toLowerCase().trim().replace(/\W_/g, "").replace(/\s/g, "-").replace(/^-+|-+$/g, "").replace(/а/g, "a").replace(/б/g, "b").replace(/в/g, "v").replace(/г/g, "g").replace(/д/g, "d").replace(/е/g, "e").replace(/ё/g, "yo").replace(/ж/g, "zh").replace(/з/g, "z").replace(/и/g, "i").replace(/й/g, "y").replace(/к/g, "k").replace(/л/g, "l").replace(/м/g, "m").replace(/н/g, "n").replace(/о/g, "o").replace(/п/g, "p").replace(/р/g, "r").replace(/с/g, "s").replace(/т/g, "t").replace(/у/g, "u").replace(/ф/g, "f").replace(/х/g, "kh").replace(/ц/g, "ts").replace(/ч/g, "ch").replace(/ш/g, "sh").replace(/щ/g, "shch").replace(/ъ/g, "").replace(/ы/g, "y").replace(/ь/g, "").replace(/э/g, "e").replace(/ю/g, "yu").replace(/я/g, "ya").slice(0, 30);



	const onSubmit = (values: z.infer<typeof NewProductSchema>) => {
		console.log(media);

		const updatedValues = {
			img: media,
			slug: slugify(values.name),
			...values
		};
		console.log('image mutation', updatedValues.img);
		mutation.mutate(
			updatedValues
		);
	};


	console.log("media: ", media);
	console.log("file: ", file);



	return (
		<div className='min-h-screen'>
			<Form {...form}>
				<form
					className='grid gap-y-8 px-24 sm:px-4 py-8 h-full'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										placeholder='Заголовок'
										disabled={mutation.isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='price'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										placeholder='Заголовок'
										className='mb-4'
										type='number'
										disabled={mutation.isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='hashtag'
						render={({ field }) => (
							<FormItem>
								<Select
									disabled={mutation.isPending}
									onValueChange={field.onChange}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue
												placeholder='Выберите категорию'

											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='electronics'>
											Электроника
										</SelectItem>
										<SelectItem value='jewelry'>
											Ювелирное украшение
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='image'
						render={({ field }) => (
							<FormItem>
								<FormLabel
									className='grid justify-center items-center bg-indigo-900 w-[32px] h-[32px] rounded-[50%]'
									htmlFor="image"
								>
									<FaFileImage width={16} height={16} color='#F5EFEF' />
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="file"
										id='image'
										disabled={mutation.isPending}
										onChange={(event) => {
											if (event.target.files && event.target.files.length > 0) {
												setFile(event.target.files[0]);
											}
										}}
										style={{ display: 'none' }}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Tiptap
										description={field.name}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 
					<FormError message={errorMessage} />
					<FormSuccess message={success} /> */}
					<Button
						type='submit'
						className='grid items-end'
						disabled={mutation.isPending && disabledFromMedia}
					>
						Создать новую запись
					</Button>
				</form>
			</Form>
		</div>
	)
}