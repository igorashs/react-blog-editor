import React, { useState, useEffect } from 'react';
import { validateText, validateTitle } from '../../lib/validator';
import { useToken } from '../../lib/helpers';
import { createPost } from '../../lib/api';

export default function PostNew() {
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
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
      const res = await createPost(
        { title, text, isPublished, date: new Date() },
        token
      );

      if (res.status !== 201) {
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
        <h2>New Post</h2>
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
          <input id="Title" type="text" onChange={handleTitleChange} />
          <label htmlFor="Text" type="text" className={textError && 'Error'}>
            Text {textError}
          </label>
          <textarea id="Text" onChange={handleTextChange}></textarea>
          <div className="FormOptions">
            <button
              id="PublishBtn"
              className="Btn"
              onClick={() => setIsPublished(true)}
            >
              Publish
            </button>
            <button
              id="SaveBtn"
              className="Btn"
              onClick={() => setIsPublished(false)}
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
