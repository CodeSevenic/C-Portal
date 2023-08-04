import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../url';

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${baseURL}/api/blog-posts?page=${page}`);
      console.log(result.data.data);
      setPosts(result.data.data);
      setTotalPages(result.data.totalPages); // set total pages
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const stripHtmlTags = (str) => {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  };

  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-5 xl:px-0 py-20">
        {posts.length > 0 &&
          posts.map((post, index) => (
            <div key={index} className="overflow-hidden flex flex-col shadow-lg rounded-lg">
              <a
                target="_blank"
                href={post.url}
                rel="noreferrer"
                className="min-h-[180px] block mb-5 rounded-lg overflow-hidden"
              >
                <img className="w-full h-full object-cover" src={post.featured_image} alt="post" />
              </a>
              <div className="px-5 pb-5 flex flex-col h-full">
                <a className="" target="_blank" href={post.url} rel="noreferrer">
                  {' '}
                  <h2 className="font-semibold text-moBlue hover:text-moBlueLight transition-all duration-300 text-2xl mb-5">
                    {post.name}
                  </h2>{' '}
                </a>
                <p className="mb-4 text-sm text-gray-500">
                  {new Date(post.created).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                <p className="text-sm grow">{stripHtmlTags(post.post_summary)}</p>
                <a
                  className="bg-moBlue hover:bg-moBlueLight transition-all duration-300  block w-fit mt-4 py-2 text-white rounded-lg px-5"
                  target="_blank"
                  href={post.url}
                  rel="noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
      </div>{' '}
      <div className="max-w-[300px] mx-auto mt-5 mb-20 flex gap-5">
        <button
          className="font-semibold text-moBlue hover:text-moBlueLight transition-all duration-300"
          onClick={handlePrev}
        >
          Prev
        </button>

        <button
          onClick={() => handlePageChange(1)}
          className={page === 1 ? 'active text-moBlueLight font-semibold' : ''}
        >
          1
        </button>

        {page > 3 && <span>...</span>}

        {[...Array(5)].map((_, i) => {
          const pageNumber = page - 2 + i; // adjust to have a window of 5 pages around the current one
          if (pageNumber <= page + 2 && pageNumber > 1 && pageNumber < totalPages) {
            return (
              <button
                key={i}
                onClick={() => handlePageChange(pageNumber)}
                className={
                  page === pageNumber
                    ? 'active text-moBlueLight font-semibold'
                    : 'hover:text-moBlueLight transition-all duration-300 hover:font-semibold'
                }
              >
                {pageNumber}
              </button>
            );
          } else {
            return null;
          }
        })}

        {page < totalPages - 2 && <span>...</span>}

        <button
          onClick={() => handlePageChange(totalPages)}
          className={
            page === totalPages
              ? 'active text-moBlueLight font-semibold'
              : 'hover:text-moBlueLight transition-all duration-300 hover:font-semibold'
          }
        >
          {totalPages}
        </button>

        <button
          className="font-semibold text-moBlue hover:text-moBlueLight transition-all duration-300"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BlogPosts;
