import { auth } from '@/auth';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (req: NextRequest) => {
	try {
		const user = await currentUser();
		const body = await req.json();

		var product;


		if (!user) {
			return NextResponse.json({ error: "Необходимо авторизоваться" }, { status: 401 });
		}

		console.log(body);



		const hastagTag = await db.hashtag.findFirst({
			where: { tag: body.hashtag }
		})

		console.log(hastagTag);



		console.log(user.id);
		console.log(hastagTag?.id);



		if (user.id && hastagTag?.id) {
			product = await db.product.create({
				data: {
					hashtagId: hastagTag?.id,
					slug: body.slug,
					name: body.name,
					description: body.description,
					image: body.img,
					price: Number(body.price),
				},
			});
		}

		console.log(product);

		return NextResponse.json(product, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};