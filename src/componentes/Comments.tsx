import React, { useState, useEffect } from "react";

interface Comment {
    id: number;
    postId: number;
    content: string;
    author: string;
}

const Comments: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");

    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem("comments") || "[]");
        setComments(storedComments);
    }, []);

    const handleAddComment = () => {
        const newComments = [
            ...comments,
            {
                id: comments.length + 1,
                postId: 1, // Asociar a un post específico (puedes cambiar esto)
                content: newComment,
                author: loggedUser.username,
            },
        ];
        setComments(newComments);
        localStorage.setItem("comments", JSON.stringify(newComments));
        setNewComment("");
    };

    return (
        <div>
            <h2>Comentarios</h2>
            <textarea
                placeholder="Escribe tu comentario"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Agregar Comentario</button>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <p>{comment.content}</p>
                        <small>Autor: {comment.author}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
