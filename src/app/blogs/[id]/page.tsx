'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function BlogPage({ params }) {
    const [blog, setBlog] = useState(null);
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await axios.get(`http://localhost:5000/blogs/${id}`, { withCredentials: true });
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        }

        fetchBlog();
    }, [id]);

    async function deleteBlog() {
        try {
            await axios.delete(`http://localhost:5000/blogs/${id}`, { withCredentials: true });
            router.push('/');
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    }

    return blog ? (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <div
                className="prose max-w-none mt-4"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <p className="mt-2 text-gray-500">Category: {blog.category}</p>

            <div className="flex space-x-4 mt-6">
                <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                    onClick={() => router.push(`/blogs/edit/${id}`)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={deleteBlog}
                >
                    Delete
                </button>
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
}
