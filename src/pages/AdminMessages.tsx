import React from 'react';
// Update the import path if necessary, or create the missing file at src/components/AdminNavbar.tsx
import AdminNavbar from '../components/AdminNavbar';
// Make sure MessageList exists at the correct path, for example:
import MessageList from '../components/MessageList';

const AdminMessages: React.FC = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) window.location.href = '/admin/login';

  return (
    <div>
      <AdminNavbar />
      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Messages</h2>
        <MessageList />
      </div>
    </div>
  );
};

export default AdminMessages;
