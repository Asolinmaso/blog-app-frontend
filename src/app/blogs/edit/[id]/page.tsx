import BlogForm from "@/components/BlogForm";

export default function EditBlogPage({ params }) {
    return <BlogForm params={params} />; // Pass the params with blog ID for editing mode
}
