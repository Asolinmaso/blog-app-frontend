'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post(
                'http://localhost:5000/auth/login',
                {
                    email,
                    password,
                },
                { withCredentials: true } // This will allow cookies to be set on the client side
            );

            // Redirect to the blogs page after successful login
            router.push('/');
        } catch (error) {
            setErrorMessage('Invalid credentials. Please try again.');
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
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
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account? <a href="/auth/register" className="text-blue-500">Register</a>
            </p>
        </div>
    );
}
