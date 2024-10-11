'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get('http://localhost:5000/blogs');
                setBlogs(response.data.blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }
        fetchBlogs();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6">Blogs</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6"
                onClick={() => router.push('/blogs/add')}
            >
                Create New Blog
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <div key={blog._id} className="border p-4 rounded-md shadow-md">
                            {/* Display the blog image */}
                            {blog.imageUrl && (
                                <img
                                    src={blog.imageUrl} // Image URL from the backend
                                    alt={blog.title}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                            )}
                            <Link href={`/blogs/${blog._id}`}>
                                <h2 className="text-2xl font-bold mb-2 hover:text-blue-500">
                                    {blog.title}
                                </h2>
                            </Link>
                            <div
                                className="text-gray-700"
                                dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100) + '...' }}
                            />
                            <p className="mt-2 text-sm text-gray-500">Category: {blog.category}</p>
                        </div>
                    ))
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        </div>
    );
}
