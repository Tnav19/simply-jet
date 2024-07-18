import React, { useState } from 'react';
import UserTable from '../../components/UserTable';
import UserForm from '../../components/UserForm';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Dashboard = () => {
  const [editingUser, setEditingUser] = useState<any | null>(null);

  const handleEdit = (user: any) => {
    setEditingUser(user);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-full">
        <div className="w-1/4 p-4 bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4">Navigation</h2>
          <ul>
            <li className="text-blue-500">Users</li>
          </ul>
        </div>
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <UserForm editingUser={editingUser} setEditingUser={setEditingUser} />
          <UserTable handleEdit={handleEdit} />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Dashboard;
