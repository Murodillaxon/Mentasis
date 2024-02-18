// CommentApp.js
import React, { useState, useEffect } from 'react';
import './style.css';

const CommentApp = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const saveCommentsToLocalStorage = (commentsData) => {
    localStorage.setItem('comments', JSON.stringify(commentsData));
  };

  const submitComment = (event) => {
    event.preventDefault();

    const newComment = {
      _id: comments.length + 1,
      name,
      text,
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    saveCommentsToLocalStorage(updatedComments);

    setName('');
    setText('');
  };

  return (
    <div className='CommentForm'>
      <h1>Секция Комментариев</h1>
      <div>
        <form onSubmit={submitComment}>
          <label htmlFor="name">Ваше Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="text">Ваш Комментарий:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <button type="submit">Добавить Комментарий</button>
        </form>
      </div>
      <div className='Comments'>
        {comments.map((comment) => (
          <div key={comment._id} className='CommentBox'>
            <strong>{comment.name}:</strong>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <footer>Спасибо за ваши мысли! 💭</footer>
    </div>
  );
};

export default CommentApp;
