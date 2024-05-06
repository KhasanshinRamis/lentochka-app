import Image from 'next/image';
import { Trash } from 'lucide-react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from 'react';



export const BasketShop = () => {
	var [count, setCount] = useState<number>(1);
	return (
		<Popover>
			<PopoverTrigger>
				<HiOutlineShoppingBag className='w-[18px] h-[18px] text-white hover:text-[#9466ff]' />
			</PopoverTrigger>
			<PopoverContent className='md:w-[200px] lg:w-[480px] p-3'>
				<div className='grid grid-flow-col col-[1fr_20px] mb-[6px] border-b-2'>
					<h2 className='font-bold text-xl text-center grid justify-center'>
						Корзина
					</h2>
				</div>
				<ScrollArea className="min-h-[50px] max-h-[150px] w-[450px] mb-[6px] border-b-2">
					<div className='grid grid-flow-col grid-cols-[80px_1fr] gap-1 py-[6px]'>
						<div className='relative h-[80px] w-[80px]'>
							<Image src='/product.jpg' alt='product' fill className='object-fill' />
						</div>
						<div className='grid grid-rows-[1fr_20px]'>
							<div className='grid grid-flow-col grid-cols-[1fr_20px] gap-2 p-2 pr-0'>
								<h3>Title</h3>
								<Trash className='w-[20px] h-[20px]' />
							</div>
							<div className='grid grid-flow-col grid-cols-[2fr_1fr] gap-3'>
								<div className='rounded-xl bg-muted grid grid-flow-col grid-cols-3'>
									<span className='grid justify-center cursor-pointer' onClick={() => setCount(count -= 1)}>-</span>
									<span className='grid justify-center'>{count}</span>
									<span className='grid justify-center cursor-pointer' onClick={() => setCount(count += 1)}>+</span>
								</div>
								<p className='grid justify-end'>
									2300 P
								</p>
							</div>
						</div>
					</div>
				</ScrollArea>
				<div>
					<div className='grid grid-flow-col grid-cols-[2fr_1fr] gap-3'>
						<p>
							Сумма заказа:
						</p>
						<p className='grid justify-end'>
							{count * 2300} Р
						</p>
					</div>
				</div>
			</PopoverContent>

		</Popover>

	);
};