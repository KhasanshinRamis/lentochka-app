"use client"
import React, { useState } from 'react';
import { HiPencilAlt, HiX } from 'react-icons/hi';
import gift from '/public/grey-present.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface WishlistCardProps {
  gifts?: string[]; 
}

const WishlistCard: React.FC<WishlistCardProps> = ({ gifts }) => {
  const [links, setLinks] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [currentHashtag, setCurrentHashtag] = useState<string>('');
  const [description, setDescription] = useState<string>("Ваше описание вишлиста здесь.");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const addLink = () => {
    setLinks([...links, '']);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleHashtagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentHashtag(e.target.value);
  };

  const handleHashtagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setHashtags([...hashtags, currentHashtag]);
      setCurrentHashtag('');
    }
  };

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="mx-auto relative bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl">
      <div className="p-2 md:flex flex-col">
        <div className="flex mt-20 justify-center mb-10">
          {gifts && gifts.length > 1 ? (
            <Slider>
              {gifts.map((gift, index) => (
                <div key={index}>
                  <img className="h-auto max-w-full object-center md:w-48" src={gift} alt="Gift" />
                </div>
              ))}
            </Slider>
          ) : (
            <div>
              {gifts && gifts.length === 1 ? (
                <img className="h-auto max-w-full object-center md:w-48" src={gifts[0]} alt="Gift" />
              ) : (
                <img className="h-auto max-w-full object-center md:w-48" src={gift.src} alt="Gift" />
              )}
            </div>
          )}
        </div>
        <div className="p-8 flex flex-col gap-y-10"> {/* Increased spacing */}
        <div>
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Описание</div>
          {isEditing ? (
            <input
              type="text"
              className="mt-2 p-2 block w-full border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <p className="mt-2 text-gray-500">{description}</p>
          )}
          </div>
          <div>
            <label htmlFor="links" className="block text-sm font-medium text-gray-700">Ссылки на продукты:</label>
            {links.length === 0 && (
                <div className="mt-2 text-gray-500">Доступных ссылок нет</div>
            )}
            {links.map((link, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  id={`link-${index}`}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Вставьте ссылку сюда..."
                  value={link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  readOnly={!isEditing}
                />
                {isEditing && (
                  <button
                    className="absolute top-0 right-0 mt-1 mr-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                    onClick={() => removeLink(index)}
                  >
                    <HiX />
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={addLink}>Добавить ссылку</button>
            )}
          </div>
          <div>
            <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700">Хэштеги:</label>
            {isEditing && <input
              type="text"
              id="hashtags"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Добавьте хэштеги"
              value={currentHashtag}
              onChange={handleHashtagChange}
              onKeyPress={handleHashtagKeyPress}
              readOnly={!isEditing}
            />}
            <div className="mt-2 space-x-2">
              {hashtags.length === 0 && (
                <div className="inline-flex items-center bg-gray-200 rounded-md p-1">Хэштегов нет</div>
              )}
              {hashtags.map((tag, index) => (
                <div key={index} className="inline-flex items-center bg-gray-200 rounded-md p-1">
                  <span className="mr-1">{tag}</span>
                  {isEditing && (
                    <button className="hover:text-neutral-500" onClick={() => removeHashtag(index)}>
                      <HiX />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 mt-4 mr-2">
            {isEditing ? (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleSaveClick}>OK</button>
            ) : (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleEditClick}>
                <HiPencilAlt /> Редактировать
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
