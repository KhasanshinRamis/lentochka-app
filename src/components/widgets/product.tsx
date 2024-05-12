import { IProduct } from '@/interface/IProduct';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { truncateText } from '@/helpers';
import { Button } from '@/components/ui/button';

interface ProductProps {
	product: IProduct;
}

export const Product = ({ product }: ProductProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{product.name}
				</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				{product.image &&
					<div className='h-[200px] relative'>
						<Image src={`/${product.image}`} alt={product.name} className='object-cover' fill />
					</div>
				}
				<div dangerouslySetInnerHTML={{ __html: truncateText(product.description, 52) }} />
				<div>
					<p>Цена: <span>{product.price}</span></p>
				</div>
			</CardContent>
			<CardFooter>
				<Button className='w-full'>Купить</Button>
			</CardFooter>
		</Card>
	);
}