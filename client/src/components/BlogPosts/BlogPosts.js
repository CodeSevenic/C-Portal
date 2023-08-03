import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../url';

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${baseURL}/api/posts?page=${page}`);
      setPosts(result.data);
    }
    fetchData();
  }, [page]);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.name}</h2>
          <p>
            <strong>Author ID:</strong> {post.blog_author_id}
          </p>
          <p>
            <strong>Created:</strong> {new Date(post.created).toLocaleDateString()}
          </p>
          <p>
            <strong>Updated:</strong> {new Date(post.updated).toLocaleDateString()}
          </p>
          <p>
            <strong>Campaign:</strong> {post.campaign_name}
          </p>
          <img src={post.featuredImage} alt="post" />
          <p>{post.post_summary}</p>
          <a href={post.url}>Read More</a>
          <div>
            <strong>Keywords:</strong>{' '}
            {post.keywords.map((keyword, i) => (
              <span key={i}>{keyword.keyword}</span>
            ))}
          </div>
          <div>
            <strong>Topics:</strong> {post.topic_ids.join(', ')}
          </div>
        </div>
      ))}
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default BlogPosts;
