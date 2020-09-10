import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToken } from '../../lib/helpers';
import { validateTitle, validateText } from '../../lib/validator';
import { updatePost } from '../../lib/api';

export default function PostEdit() {
  const post = useLocation().state;
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [isPublished, setIsPublished] = useState(post.isPublished);
  const [titleError, setTitleError] = useState('');
  const [textError, setTextError] = useState('');

  const token = useToken();

  async function handleSubmit(e) {
    e.preventDefault();

    const titleError = validateTitle(title);
    const textError = validateText(text);

    if (titleError || textError) {
      setTitleError(titleError);
      setTextError(textError);
    } else {
      const res = await updatePost(
        post._id,
        { title, text, isPublished, date: new Date() },
        token
      );

      if (res.status !== 204) {
        setTitleError('invalid');
        setTextError('invalid');
      } else {
        window.location.reload();
      }
    }
  }

  useEffect(() => {
    if (title !== null) {
      setTitleError(validateTitle(title));
    }
  }, [title]);

  useEffect(() => {
    if (text !== null) {
      setTextError(validateText(text));
    }
  }, [text]);

  function handleTitleChange(e) {
    setTitle(e.currentTarget.value);
  }

  function handleTextChange(e) {
    setText(e.currentTarget.value);
  }

  return (
    <main>
      <header>
        <h2>Edit Post</h2>
      </header>
      <section
        className={
          'PostFormSection ' + ((titleError || textError) && 'FormError')
        }
      >
        <form className="PostForm" onSubmit={handleSubmit}>
          <label htmlFor="Title" className={titleError && 'Error'}>
            Title {titleError}
          </label>
          <input
            id="Title"
            type="text"
            onChange={handleTitleChange}
            value={title}
          />
          <label htmlFor="Text" type="text" className={textError && 'Error'}>
            Text {textError}
          </label>
          <textarea
            id="Text"
            onChange={handleTextChange}
            value={text}
          ></textarea>
          <div className="FormOptions">
            <button
              id="PublishBtn"
              className="Btn"
              onClick={() =>
                isPublished ? setIsPublished(false) : setIsPublished(true)
              }
            >
              {post.isPublished ? 'Unpublish' : 'Publish'}
            </button>
            <button
              id="SaveBtn"
              className="Btn"
              // onClick={() => setIsPublished(false)}
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
