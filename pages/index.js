import "../app/globals.css";

export async function getServerSideProps() {

    try {

        const response = await fetch(`${process.env.API_URL}/posts`);

        const data = await response.json();

        return {
            props: {
                posts: data
            }
        }

    } catch (error) {
        console.log(error);

        return {
            props: {
                posts: []
            }
        }
    }

}

export default function PostPage(props) {

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {
                    props.posts.map((post, index) => (
                        <li key={index} className="bg-white rounded shadow-md overflow-hidden text-gray-600">
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
                                <p className="text-gray-700 mb-4">{post.content}</p>
                                <small className="text-gray-500">{new Date(post.date).toLocaleDateString(
                                    'en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }
                                )}</small>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}