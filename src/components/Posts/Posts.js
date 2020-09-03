import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addTimestamps, sortByDate, logout } from '../../lib/helpers';
import { fetchPosts } from '../../lib/api';

export default function Posts() {
  const posts = usePosts();
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  // const filteredPost = useFilteredPosts(posts);

  useEffect(() => {
    if (!filteredPosts) {
      setFilteredPosts(posts);
      return;
    }

    let newFilteredPosts = posts;

    if (isPublished) {
      newFilteredPosts = newFilteredPosts.filter((post) => post.isPublished);
    }

    setFilteredPosts(newFilteredPosts);
    // TODO
  }, [posts, isPublished]);

  function handlePublished() {
    setIsPublished(!isPublished);
  }

  return (
    <section className="PostsListSection">
      <section className="filters">
        <h3>Filters</h3>
        <div className="filtersOptions">
          <button
            onClick={handlePublished}
            className={
              'filter ' + (isPublished ? 'filterEnabled' : 'filterDisabled')
            }
          >
            Published
          </button>
        </div>
      </section>
      <ul className="PostsList">
        {filteredPosts &&
          filteredPosts.map((post) => (
            <li className="PostListItem" key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <article>
                  <h3>
                    {post.title.length > 200
                      ? `${post.title.slice(0, 200)}...`
                      : post.title}
                  </h3>
                  <p>{post.timestamp}</p>
                </article>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}

// fetch posts data and return posts state
function usePosts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem('token');
      const res = await fetchPosts(token);

      console.log(res);

      if (!res.error) {
        addTimestamps(res);
        sortByDate(res);
        setPosts(res);
      } else {
        if (res.error.message === 'Forbidden') {
          logout();
        }

        console.error('Failed to fetch the data, Try to fetch again in 5sec');
        setTimeout(fetch, 5000);
      }
    };

    fetch();
  }, []);

  return posts;
}
