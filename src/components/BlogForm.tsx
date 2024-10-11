'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function BlogForm({ params }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const router = useRouter();
    const isEditing = !!params?.id;
    async function fetchBlog() {
        try {
            const response = await axios.get(`http://localhost:5000/blogs/${params.id}`, { withCredentials: true });
            const blog = response.data;
            setTitle(blog.title);
            setContent(blog.content);
            setCategory(blog.category);
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    }
    // If editing, fetch the existing blog data
    useEffect(() => {
        if (isEditing) {
            fetchBlog();
        }
    }, [isEditing, params]);
    
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);  
    };

    async function handleSubmit(e) {
        e.preventDefault();

        // Use FormData to handle file upload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('image', image);  
        
        try {
            if (isEditing) {
                // Send a PUT request with form data for updating
                await axios.put(`http://localhost:5000/blogs/${params.id}`, formData, {
                    withCredentials: true,
                });
                router.push(`/blogs/${params.id}`);
            } else {
                // Send a POST request with form data for creating a new blog
                await axios.post('http://localhost:5000/blogs/upload', formData, {
                    withCredentials: true,
                });
                router.push('/');
            }
        } catch (error) {
            console.error('Error submitting blog:', error);
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Blog' : 'Create Blog'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                />
                <textarea
                    placeholder="Content (HTML supported)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    rows={10}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}  // Handle file input change
                    className="w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    {isEditing ? 'Update Blog' : 'Create Blog'}
                </button>
            </form>
        </div>
    );
}
