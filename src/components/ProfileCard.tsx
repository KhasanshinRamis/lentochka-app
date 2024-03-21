"use client"
import React, { useState } from 'react';

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("Иван Иванов");
  const [editedPreferences, setEditedPreferences] = useState("Привет! Меня зовут Иван, я студент из Москвы. В свободное время люблю заниматься фотографией, путешествовать и читать книги. Я обожаю природу, особенно горы, и мечтаю побывать на всех континентах. Мои хобби включают фотографию ландшафтов, готовку экзотических блюд и занятия йогой.");
  const avatarUrl = "avatar.png";

  const handleEdit = (type: string) => {
    setIsEditing(type);
  };

  const handleSave = () => {
    setIsEditing(null);
    // В зависимости от значения isEditing сохраняем изменения в соответствующем состоянии
    if (isEditing === "name") {
      // Сохраняем измененное имя
    } else if (isEditing === "preferences") {
      // Сохраняем измененную информацию о пользователе
    }
  };

  return (
    <div className="h-screen bg-gray-100 relative flex flex-col flex-grow items-center">
      <h1 className="text-3xl mb-4 text-pink-500">Это Вы</h1>
      <div className="flex flex-row items-center">
        <div>
          <div className="mb-4 mr-4">
            <img src={avatarUrl} alt="User Avatar" className="rounded-full w-40 h-40" />
          </div>
        </div>
        <div className="max-w-sm mt-4">
          <div className="text-center mb-2">
            <div className="text-xl font-semibold">
              {isEditing === "name" ? (
                <input 
                  type="text" 
                  defaultValue={editedName} 
                  onBlur={(e) => setEditedName(e.target.value)}
                />
              ) : (
                <div onClick={() => handleEdit("name")}>
                  {editedName}
                </div>
              )}
            </div>
            <div>
              {isEditing === "preferences" ? (
                <textarea 
                  defaultValue={editedPreferences} 
                  onBlur={(e) => setEditedPreferences(e.target.value)}
                  className="w-full h-32 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:outline-none focus:shadow-outline"
                />
              ) : (
                <div onClick={() => handleEdit("preferences")}>
                  {editedPreferences}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isEditing && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleEdit("name")}>Редактировать</button>
        </div>
      )}
      {isEditing && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSave}>Сохранить</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
