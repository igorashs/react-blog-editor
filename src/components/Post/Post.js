import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addTimestamps } from '../../lib/helpers';
import { fetchPostCommentsWithId } from '../../lib/api';

export default function Post() {
  const post = useLocation().state;
  const comments = useComments(post._id);

  return (
    <article className="PostPage">
      <header>
        <h1>
          <span className="Italic">{post.title}</span>
          <p className="Date">Posted: {post.timestamp}</p>
        </h1>
      </header>
      <section className="PostText">
        <p>{post.text}</p>
      </section>
      <footer>
        <section className="PostComments">
          <h2>Comments</h2>
          {comments.length > 0 ? (
            <ul>
              {comments.map((c) => (
                <li key={c._id}>
                  <article className="PostComment">
                    <h3>{c.username}</h3>
                    <div>
                      <p className="CommentText">{c.text}</p>
                      <p className="CommentDate">{c.timestamp}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            'No Comments'
          )}
        </section>
      </footer>
    </article>
  );
}

// Fetch post comments and return the state
function useComments(postId) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const comments = await fetchPostCommentsWithId(postId);

      if (!comments.error) {
        addTimestamps(comments);
        setComments(comments);
      } else {
        setComments([]);
      }
    };
    fetch();
  }, [postId]);

  return comments;
}
