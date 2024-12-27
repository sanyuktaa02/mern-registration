import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your backend API
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    // Call DELETE API to delete user
    fetch(`/api/users/${id}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter((user) => user._id !== id)))
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <div className="dashboard">
      <h2>Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
