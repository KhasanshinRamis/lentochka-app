import { auth } from '@/auth';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (req: NextRequest) => {
	try {
		const user = await currentUser();

		if (!user) {
			return NextResponse.json({ error: "Необходимо авторизоваться" }, { status: 401 });
		};

		const body = await req.json()

		console.log(body);

		var order;

		if (user.id && body.arrProductId) {
			order = await db.order.create({
				data: {
					userId: user.id,
					productId: body.arrProductId,
					createdAt: new Date(),
					status: 'Не оплачено',
					adress: '',
					deliveryDate: '',
				}
			});
		}

		console.log(order);
		

		// const basket = await db.basket.findMany({
		// 	where: {
		// 		userId: user.id
		// 	}
		// })

		// console.log(basket);


		// const productInBusket = []

		// for (var itemBasket of basket) {
		// 	var product = await db.product.findFirst({
		// 		where: {
		// 			id: itemBasket.productId
		// 		}
		// 	})
		// 	console.log(product);
		// 	const newItemBasket = {
		// 		productId: product?.id,
		// 		productName: product?.name,
		// 		productImage: product?.image,
		// 		productDescription: product?.description,
		// 		productPrice: product?.price,
		// 		productCount: itemBasket.count
		// 	}
		// 	console.log(newItemBasket);

		// 	productInBusket.push(newItemBasket);
		// };
		// console.log(productInBusket);

		return NextResponse.json(order, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};