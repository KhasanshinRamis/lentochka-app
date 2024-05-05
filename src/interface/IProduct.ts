import { Hashtag } from '@prisma/client';

export interface IProduct {
	id: string;
	name: string;
	hashtag: Hashtag;
	hashtagId: string;
	slug: string;
	price: number;
	description: string;
	image: string;
}