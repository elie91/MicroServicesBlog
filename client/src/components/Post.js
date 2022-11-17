import React, { useState } from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments || []);

  const handleCreateComment = async ({ content }) => {
    const allCommentsData = await axios.post(`http://localhost:4001/posts/${post.id}/comments`, {
      content,
    });
    setComments(allCommentsData.data);
  }

  return (
    <div
      className="card"
      style={{ width: "30%", marginBottom: "20px" }}
      key={post.id}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentList comments={comments} />
        <CommentCreate onCreateComment={handleCreateComment} />
      </div>
    </div>
  )
};

export default Post;
