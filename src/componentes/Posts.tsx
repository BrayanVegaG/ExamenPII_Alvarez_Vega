import React, { useState, useEffect } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<{ title: string; content: string }>({ title: "", content: "" });

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
        setPosts(storedPosts);
    }, []);

    const handleCreatePost = () => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
        const newPosts = [
            ...posts,
            {
                id: posts.length + 1,
                title: newPost.title,
                content: newPost.content,
                author: loggedUser.username,
            },
        ];
        setPosts(newPosts);
        localStorage.setItem("posts", JSON.stringify(newPosts));
        setNewPost({ title: "", content: "" });
    };

    return (
        <div>
            <h2>Posts</h2>
            <div>
                <input
                    type="text"
                    placeholder="Título"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <textarea
                    placeholder="Contenido"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <button onClick={handleCreatePost}>Crear Post</button>
            </div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>Autor: {post.author}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
