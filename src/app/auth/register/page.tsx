'use client';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function handleRegister(e) {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await axios.post('http://localhost:5000/auth/register', {
                username,
                email,
                password,
            }, { withCredentials: true }); 

            setSuccessMessage('Registration successful! Redirecting to login...');
            
        } catch (error) {
            setErrorMessage('Error registering. Please try again.');
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md"
                >
                    Register
                </button>
            </form>
            <p className="mt-4 text-center">
                Already have an account? <a href="/auth/login" className="text-blue-500">Login</a>
            </p>
        </div>
    );
}
