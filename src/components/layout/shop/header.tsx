'use client';
import Link from 'next/link';
import { CiHeart } from "react-icons/ci";
import { PiListPlus } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { MenuShop } from '@/components/layout/shop/menu';
import { ModalSearch } from '@/components/layout/shop/searchModal';
import { BasketShop } from '@/components/layout/shop/basketShop';



export const HeaderShop = () => {
	return (
		<header className='grid grid-flow-col grid-cols-3 items-center relative px-4 py-6 bg-gray-900'>
			<MenuShop />
			<div className='grid items-center justify-center relative h-[50px]'>
				{/* <Image src='/logo.png' alt='logo' fill className='object-fill' /> */}
				<div>Logo</div>
			</div>
			<ul className='grid grid-flow-col gap-3 justify-between'>
				<li>
					<ModalSearch />
				</li>
				<li>
					<Link href='/favorites'>
						<CiHeart className='w-[18px] h-[18px] text-white hover:text-[#9466ff]' />
					</Link>
				</li>
				<li>
					<Link href='/comparision'>
						<PiListPlus className='w-[18px] h-[18px] text-white hover:text-[#9466ff]' />
					</Link>
				</li>
				<li>
					<BasketShop />
				</li>
				<li>
					<Link href='/account'>
						<RxAvatar className='w-[18px] h-[18px] text-white hover:text-[#9466ff]' />
					</Link>

				</li>
			</ul>
		</header>
	);
};