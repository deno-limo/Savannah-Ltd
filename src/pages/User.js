// src/pages/UserPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]); // Holds all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Holds the filtered users for display
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering

  // Fetch the users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      setFilteredUsers(response.data); // Set the filtered users initially as all users
    };
    fetchUsers();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter users based on the search term (name or email)
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Users</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: '10px',
          width: '300px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />

      {/* User list */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>NAME</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{user.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center', padding: '10px' }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;
