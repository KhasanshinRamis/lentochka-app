"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {

  const router = useRouter()

  const profileSubmit = () => {
    router.push("/start")
  }

  const friendsSubmit = () => {
    router.push("/friends")
  }

  return (
    <div className="h-screen w-64 bg-gray-200 flex flex-col justify-between">
      <div className="mt-8">
        <button className="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-300 font-semibold" onClick={profileSubmit}>Профиль</button>
        <button className="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-300 font-semibold" onClick={friendsSubmit}>Друзья</button>
        <button className="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-300 font-semibold">Лента</button>
        <button className="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-300 font-semibold">Магазин</button>
        <button className="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-300 font-semibold">Настройки</button>
      </div>
      <div className="mb-8">
      </div>
    </div>
  );
};

export default Sidebar;
