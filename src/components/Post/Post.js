import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addTimestamps } from '../../lib/helpers';
import {
  fetchPostCommentsWithId,
  deleteCommentById,
  deletePost
} from '../../lib/api';
import { Link } from 'react-router-dom';
import { useToken } from '../../lib/helpers';

export default function Post() {
  const token = useToken();
  const post = useLocation().state;
  const [comments, setComments] = useComments(post._id);

  async function handleCommentDeleteClick(e) {
    const { commentid: commentID } = e.currentTarget.dataset;

    const res = await deleteCommentById(post._id, commentID, token);
    if (res.status === 204) {
      setComments(comments.filter((c) => c._id !== commentID));
    } else {
      window.alert('Something went wrong!');
    }
  }

  async function handlePostDeleteClick() {
    console.log('ye');
    const res = await deletePost(post._id, token);

    if (res.status === 204) {
      window.location.replace('/');
    } else {
      window.alert('Something went wrong!');
    }
  }

  return (
    <article className="PostPage">
      <section className="PostMenu">
        <ul className="PostMenuList">
          <li>
            <Link
              to={{ pathname: `/posts/${post._id}/edit/`, state: post }}
              className="EditBtn menuBtn"
            >
              Edit
            </Link>
          </li>
          <li>
            <button
              className="DeleteBtn menuBtn"
              onClick={handlePostDeleteClick}
            >
              Delete
            </button>
          </li>
        </ul>
      </section>
      <header>
        <h1>
          <span className="Italic">{post.title}</span>
          <p className="Date">
            {post.isPublished ? 'Posted: ' : 'Last Update: '} {post.timestamp}
          </p>
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
                    <button
                      className="DeleteBtn menuBtn"
                      data-commentid={c._id}
                      onClick={handleCommentDeleteClick}
                    >
                      Delete
                    </button>
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

  return [comments, setComments];
}
