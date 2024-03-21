import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-200 flex flex-col justify-between">
      <div className="mt-8">
        <button className="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-300 font-semibold">Профиль</button>
        <button className="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-300 font-semibold">Друзья</button>
        <button className="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-300 font-semibold">Лента</button>
        <button className="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-300 font-semibold">Магазин</button>
        <button className="block w-full py-2 px-4 text-left text-gray-600 hover:bg-gray-300 font-semibold">Настройки</button>
      </div>
      <div className="mb-8">
        {/* Дополнительное содержимое боковой панели, если необходимо */}
      </div>
    </div>
  );
};

export default Sidebar;
