"use client"
import React, { useState } from 'react';
import logo from "/public/logo.png";
import { Button, Popover, MenuItem } from '@mui/material';
import copy from 'clipboard-copy';
import { toast } from 'react-hot-toast';


const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (option: string, text: string) => {
        copy(text); // Копировать текст в буфер обмена
        handleClose(); // Закрыть Popover
        toast.success(`Текст "${text}" скопирован`); // Вывести уведомление
    };

    return (
        <div className="bg-white text-gray-900 py-4 px-8 flex justify-between items-center relative">
            <div className="flex items-center">
                <img src={logo.src} alt="Логотип" className="h-14 object-contain mr-5" />
                <div className="ml-6 flex items-center gap-8">
                    <Button onClick={handleClick}>Контакты</Button>
                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem onClick={() => handleOptionClick('email', 'lentochka@gmail.com')}>Email: lentochka@gmail.com</MenuItem>
                        <MenuItem onClick={() => handleOptionClick('phone', '8999999999')}>Phone: 8999999999</MenuItem>
                    </Popover>
                    <button className="">О нас</button>
                    <button className="">Техподдержка</button>
                </div>
            </div>
            <div className="flex">
                <button className="mr-5">Sign In</button>
                <button>Sign Up</button>
            </div>
        </div>
    );
};

export default Header;
