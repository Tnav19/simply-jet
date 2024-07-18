import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ editingUser, setEditingUser }: { editingUser: any; setEditingUser: (user: any) => void }) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    alternate_email: '',
    age: 0,
    password: '',
  });

  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
    } else {
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        alternate_email: '',
        age: 0,
        password: '',
      });
    }
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`/api/users/${editingUser.id}`, form);
      } else {
        await axios.post(`/api/users`, form);
      }
      setEditingUser(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        placeholder="First Name"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        name="alternate_email"
        value={form.alternate_email}
        onChange={handleChange}
        placeholder="Alternate Email"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        name="age"
        value={form.age}
        onChange={handleChange}
        placeholder="Age"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {editingUser ? 'Update' : 'Add'} User
      </button>
    </form>
  );
};

export default UserForm;
