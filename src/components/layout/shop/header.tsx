'use client';
import Image from 'next/image';
import Link from 'next/link';
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiListPlus } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { MenuShop } from '@/components/layout/shop/menu';



export const HeaderShop = () => {
	return (
		<header className='grid grid-flow-col grid-cols-3 items-center relative z-3 px-9 py-6 bg-[#1D2533] shadow-sm'>
			<MenuShop />
			<div className='grid items-center justify-center relative h-[50px]'>
				{/* <Image src='/logo.png' alt='logo' fill className='object-fill' /> */}
				<div>Logo</div>
			</div>
			<ul className='grid grid-flow-col gap-3'>
				<li>
					<CiSearch className='w-[18px] h-[18px] text-white hover:text-[#9466ff]' />
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
					<Link href='/cart'>
						<HiOutlineShoppingBag className='w-[18px] h-[18px] text-white hover:text-[#9466ff]' />
					</Link>
				</li>
				<li>
					<Link href='/profile'>
						<RxAvatar className='w-[18px] h-[18px] text-white hover:text-[#9466ff]' />
					</Link>

				</li>
			</ul>
		</header>
	);
};