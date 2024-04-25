"use client"
import React, { ChangeEvent, useState } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Button } from "@/components/ui/button"
import WishlistCard from '@/components/WishlistCard';

const ProfileCard = () => {
  const user = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState<string>(user?.name || '');
  const [editedNickname, setEditedNickname] = useState<string>(user?.nickname || '');
  // const [editedDescription, setEditedDescription] = useState<string>(user?.description || '');
  const [editedDescription, setEditedDescription] = useState<string>('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Отправка данных о профиле на сервер
    setIsEditing(false);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedNickname(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(event.target.value);
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Обработка загрузки новой аватарки
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center">
        <div className="md:flex">
          <div className="md:flex-shrink-0 relative">
            <img
              className="h-48 w-48 object-cover rounded-full mx-auto mt-6 md:mt-0 cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80"
              src={user?.image || "/avatar.png"}
              alt="Avatar"
            />
            {isEditing && (
              <label
                htmlFor="avatar-upload"
                className="absolute h-48 w-48 inset-0 flex justify-center items-center bg-black bg-opacity-40 text-white text-3xl rounded-full cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-100"
              >
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                +
              </label>
            )}
          </div>
          <div className="p-8 w-full">
            {isEditing ? (
              <div className="flex flex-row gap-x-2">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => handleNameChange(e)}
                  className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
                <input
                  type="text"
                  value={editedNickname}
                  onChange={(e) => handleNicknameChange(e)}
                  className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-2">{editedName}</h2>
                <p className="text-gray-500 mb-4">{editedNickname}</p>
              </div>
            )}
            {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => handleDescriptionChange(e)}
                maxLength={50}
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 resize-none"
              />
            ) : (
              //<p className="text-gray-700 mb-4">{user?.description || "Расскажите о себе"}</p>
              <p className="text-gray-700 mb-4 max-w-40 overflow-x-auto">{editedDescription.length == 0 ? "Расскажите о себе" : editedDescription}</p>
            )}
            <div className="flex justify-end">
              {isEditing ? (
                <Button
                  onClick={handleSaveClick}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Сохранить
                </Button>
              ) : (
                <Button
                  onClick={handleEditClick}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Редактировать
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default ProfileCard;