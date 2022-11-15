import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line 
  }, []);

  useEffect(() => {
    document.addEventListener(`fetch-post-${postId}-comments`, fetchData);
    return () => document.removeEventListener(`fetch-post-${postId}-comments`, fetchData)
     // eslint-disable-next-line 
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
