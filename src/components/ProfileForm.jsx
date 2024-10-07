import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa'; // استيراد أيقونة القلم

const ProfileForm = ({ photo, setPhoto }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoFile, setPhotoFile] = useState(photo);
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
      const storedName = localStorage.getItem('name');
      const storedEmail = localStorage.getItem('email');
      const storedPhoto = localStorage.getItem('photo');
  
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhoto) {
        setPhotoFile(storedPhoto);
        setPhoto(storedPhoto); // تحديث الصورة في الـ NavBar
      }
    }, [setPhoto]);
  
    const handleSave = (e) => {
      e.preventDefault();
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('photo', photoFile);
      setIsEditing(false);
    };
  
    const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhoto(reader.result);
          setPhotoFile(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <img src={photoFile} alt="Admin" className="w-32 h-32 rounded-full mx-auto mb-4" />
  
        {isEditing && (
          <label className="cursor-pointer text-blue-500 flex justify-center items-center mt-4">
            <FaPen className="mr-2" />
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>
        )}
  
        {isEditing ? (
          <form onSubmit={handleSave} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-600">{email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-4"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    );
  };
  
export default ProfileForm;  