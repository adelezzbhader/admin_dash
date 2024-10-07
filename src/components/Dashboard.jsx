// src/components/Dashboard.js
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'User', value: 400 },
  { name: 'Courses', value: 300 },
  { name: 'Tracks', value: 300 },
];

const additionalData1 = [
  { name: 'January', value: 200 },
  { name: 'February', value: 400 },
  { name: 'March', value: 300 },
];

const additionalData2 = [
  { name: 'Course A', value: 240 },
  { name: 'Course B', value: 300 },
  { name: 'Course C', value: 150 },
];

const Dashboard = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Breadcrumb */}
      <div className="text-gray-600 mb-4">Home / Dashboard</div>

      {/* Cards Row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Card for Number of Users */}
        <div className="bg-blue-500 text-white shadow-md rounded-md p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-3xl">100</p>
        </div>

        {/* Card for Number of Courses */}
        <div className="bg-green-500 text-white shadow-md rounded-md p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold">Courses</h2>
          <p className="text-3xl">50</p>
        </div>

        {/* Card for Number of Tracks */}
        <div className="bg-yellow-500 text-white shadow-md rounded-md p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold">Tracks</h2>
          <p className="text-3xl">10</p>
        </div>
      </div>

      {/* Statistics and Charts Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Statistics Card */}
        <div className="bg-white shadow-md rounded-md p-4 flex flex-col">
          <h2 className="text-lg font-semibold">Statistics</h2>
          <PieChart width={200} height={200}>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white shadow-md rounded-md p-4 flex flex-col">
          <h2 className="text-lg font-semibold">User Growth</h2>
          <BarChart width={300} height={200} data={additionalData1}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Courses Chart */}
        <div className="bg-white shadow-md rounded-md p-4 flex flex-col">
          <h2 className="text-lg font-semibold">Course Popularity</h2>
          <BarChart width={300} height={200} data={additionalData2}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Another Statistics Chart */}
        <div className="bg-white shadow-md rounded-md p-4 flex flex-col">
          <h2 className="text-lg font-semibold">Enrollment Statistics</h2>
          <PieChart width={200} height={200}>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#FF8042', '#FFBB28', '#0088FE'][index]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
