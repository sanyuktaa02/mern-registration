import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
    const [user, setUser] = useState({ firstName: '', lastName: '', mobile: '', password: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/users/register', user);
        alert(response.data.message);
    };

    return (
        <div className="registration">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;
