import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Tracks from './components/Tracks';
import Sidebar from './components/Sidebar';
import NavBar from './components/Navbar';
import ProfileForm from './components/ProfileForm'; // استيراد نموذج الملف الشخصي
import './App.css';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [photo, setPhoto] = useState(''); // حالة الصورة
  const [name, setName] = useState(localStorage.getItem('name') || ''); // حفظ الاسم

  useEffect(() => {
    const storedPhoto = localStorage.getItem('photo'); // استرجاع الصورة من localStorage
    if (storedPhoto) {
      setPhoto(storedPhoto); // تعيين الصورة
    }
  }, []); // يتم تنفيذ هذا التأثير عند تحميل المكون فقط

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'tracks':
        return <Tracks />;
      case 'profile':
        return <ProfileForm photo={photo} setPhoto={setPhoto} />; // إضافة الحالة للصورة
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex-1 flex flex-col">
        <NavBar photo={photo} name={name} setActiveComponent={setActiveComponent} />
        <div className="flex-1 p-4 overflow-y-auto mt-8">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default App;
