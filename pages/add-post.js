import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function AddPostPage() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setError(null);

        try {

            // console.log(process.env.API_URL,"Hello");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                throw new Error("Something went wrong while creating the new post");
            }

            router.push("/");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }



    }

    return (
        <Layout>
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add a New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm px-4 py-2"
                    />
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm px-4 py-2"
                        rows="5"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Post"}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>
        
        </Layout>

    )

}