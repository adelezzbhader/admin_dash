import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

const NavBar = ({ photo, setActiveComponent }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // حالة لفتح القائمة المنسدلة

  return (
    <nav className="bg-white shadow-md w-[calc(100%-16rem)] h-16 flex items-center justify-between px-6 fixed top-0 left-64 z-50 transition-all duration-300">
      {/* Search Box */}
      <div className="relative flex items-center w-1/3">
        <AiOutlineSearch className="absolute left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
        />
      </div>

      <div className="relative flex items-center space-x-4">
        {/* Admin Profile Picture */}
        <div className="relative">
          {photo ? (
            <img
              src={photo}
              alt="Admin"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)} // تغيير حالة القائمة عند النقر
            />
          ) : (
            <FaUserCircle
              className="text-3xl text-gray-600 cursor-pointer hover:text-blue-500 transition duration-200"
              onClick={() => setDropdownOpen(!dropdownOpen)} // تغيير حالة القائمة عند النقر
            />
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && ( // عرض القائمة إذا كانت مفتوحة
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setActiveComponent('profile'); // تغيير المكون عند الضغط
                  setDropdownOpen(false); // إغلاق القائمة بعد النقر
                }}
              >
                My Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)} // إغلاق القائمة بعد النقر
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
