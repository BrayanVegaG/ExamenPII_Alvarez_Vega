import React, { useState, useEffect } from "react";
import "./PostconComentarios.css";


interface Comment {
    id: number;
    postId: number;
    content: string;
    author: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    comments: Comment[];
}

const PostsConComentarios: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<{ title: string; content: string }>({ title: "", content: "" });
    const [newComment, setNewComment] = useState<{ content: string; postId: number | null }>({
        content: "",
        postId: null,
    });

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");

    useEffect(() => {
        try {
            const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
            if (Array.isArray(storedPosts)) {
                setPosts(storedPosts);
            }
        } catch (error) {
            console.error("Error al cargar los posts desde localStorage:", error);
        }
    }, []);

    const handleCreatePost = () => {
        const newPosts = [
            ...posts,
            {
                id: posts.length + 1,
                title: newPost.title,
                content: newPost.content,
                author: loggedUser.username,
                comments: [],
            },
        ];
        setPosts(newPosts);
        localStorage.setItem("posts", JSON.stringify(newPosts));
        setNewPost({ title: "", content: "" });
    };

    const handleAddComment = (postId: number) => {
        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                const newCommentObj: Comment = {
                    id: (post.comments?.length || 0) + 1,
                    postId,
                    content: newComment.content,
                    author: loggedUser.username,
                };
                return { ...post, comments: [...(post.comments || []), newCommentObj] };
            }
            return post;
        });
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        setNewComment({ content: "", postId: null });
    };

    const handleDeletePost = (postId: number) => {
        if (loggedUser.role === "Administrador") {
            const updatedPosts = posts.filter((post) => post.id !== postId);
            setPosts(updatedPosts);
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
        } else {
            alert("Solo el Administrador puede eliminar publicaciones.");
        }
    };

    return (
        <div className="container">
            <h2>Posts con Comentarios</h2>
            {loggedUser.role !== "Administrador" && (
                <div className="post-form">
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
            )}
    
            <ul>
                {posts?.map((post) => (
                    <li key={post.id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>Autor: {post.author}</small>
    
                        {loggedUser.role === "Administrador" && (
                            <button onClick={() => handleDeletePost(post.id)}>Eliminar Post</button>
                        )}
    
                        <h4>Comentarios:</h4>
                        <ul>
                            {(post.comments || []).map((comment) => (
                                <li key={comment.id} className="comment">
                                    <p>{comment.content}</p>
                                    <small>Autor: {comment.author}</small>
                                </li>
                            ))}
                        </ul>
    
                        {loggedUser.role !== "Administrador" && (
                            <div className="comment-form">
                                <textarea
                                    placeholder="Escribe tu comentario"
                                    value={newComment.postId === post.id ? newComment.content : ""}
                                    onChange={(e) =>
                                        setNewComment({ content: e.target.value, postId: post.id })
                                    }
                                />
                                <button onClick={() => handleAddComment(post.id)}>Agregar Comentario</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default PostsConComentarios;
