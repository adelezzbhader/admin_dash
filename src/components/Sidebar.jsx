import React from 'react';
import { AiOutlineDashboard, AiOutlineUser, AiOutlineVideoCamera, AiOutlineBook, AiOutlineLogout } from 'react-icons/ai';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-lg">
      {/* Logo and Name */}
      <div className="flex items-center justify-center p-6 border-b border-gray-700">
        <AiOutlineDashboard className="text-3xl mr-2" />
        <span className="text-xl font-bold">Basatha</span>
      </div>

      {/* Sidebar Items */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        <SidebarItem title="Dashboard" icon={<AiOutlineDashboard />} onClick={() => setActiveComponent('dashboard')} />
        <SidebarItem title="Users" icon={<AiOutlineUser />} onClick={() => setActiveComponent('users')} />
        <SidebarItem title="Tracks" icon={<AiOutlineBook />} onClick={() => setActiveComponent('tracks')} />
        <SidebarItem title="Logout" icon={<AiOutlineLogout />} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ title, icon, onClick }) => (
    <div
      className={`flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200 ease-in-out cursor-pointer ${
        title === "Logout" ? "text-red-500" : "text-white"
      }`}
      onClick={onClick}
    >
      <div className="text-2xl">{icon}</div>
      <span className="ml-4 text-lg">{title}</span>
    </div>
  );
  

// تأكد من تصدير Sidebar بشكل صحيح
export default Sidebar;
