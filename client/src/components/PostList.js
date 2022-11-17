import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    document.addEventListener('fetch-posts', fetchPosts);
    return () => document.removeEventListener('fetchPostList', fetchPosts)
  }, []);

  const renderedPosts = useMemo(() => Object.values(posts).map((post) => {
    return (
      <Post post={post} key={post.id} />
    );
  }), [posts]);

  return (
    <div className="d-flex flex-row flex-wrap" style={{gap: '10px'}}>
      {renderedPosts}
    </div>
  );
};

export default PostList;
