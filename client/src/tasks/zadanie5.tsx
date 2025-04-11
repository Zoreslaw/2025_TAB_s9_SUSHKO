import { useEffect, useState } from "react";

type Post = { id: number; title: string; body: string };

const Post: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => res.json())
        .then((data: Post) => setPost(data));
    }, []);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="post">
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
        </div>
    )
}

export default Post;