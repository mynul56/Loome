import React, { useEffect, useState } from 'react';

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetch('/api/admin/messages', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setMessages);
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) window.location.reload();
  };

  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Message</th>
          <th className="p-2">Date</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {messages.map(msg => (
          <tr key={msg._id}>
            <td className="p-2">{msg.name}</td>
            <td className="p-2">{msg.email}</td>
            <td className="p-2">{msg.message}</td>
            <td className="p-2">{new Date(msg.createdAt).toLocaleString()}</td>
            <td className="p-2">
              <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(msg._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MessageList;
