import React, { useState, useEffect } from 'react';

const TodoApp = () => {
     const initiallikes = JSON.parse(localStorage.getItem('likes')) || [];

  const [likes, setlikes] = useState(initiallikes);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  // Load likes from local storage when the component mounts
//   useEffect(() => {
//     const storedlikes = JSON.parse(localStorage.getItem('likes'));
//     setlikes(storedlikes);
//   }, []);

  // Save likes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, );

  const addlike = () => {
     {
        const newlike = {
            id: new Date().getTime(), // Generates a unique id based on current time
            text: text, // Use the text entered by the user
          };
      setlikes([...likes, newlike]);
      setText('');
    }
  };

  const updatelike = (id) => {
    if (editText.trim() !== '') {
        const updatedlikes = likes.map((like) =>
        like.id === id ? { ...like, text: editText } : like
      );

      setlikes(updatedlikes);
      setEditIndex(-1);
      setEditText('');
    }
  };

  const deletelike = (id) => {
    const updatedlikes = likes.filter((like) => like.id !== id);
    setlikes(updatedlikes);
  };

  return (
    <div>
      <h1>Like App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new like"
      />
      <button onClick={addlike}>Add</button>
      <ul>
  {likes.map((like) => (
    <li key={like.id}>
      {editIndex === like.id ? (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={() => updatelike(like.id)}>Update</button>
          <button onClick={() => setEditIndex(-1)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{like.text}</p>
          <button onClick={() => setEditIndex(like.id)}>Edit</button>
          <button onClick={() => deletelike(like.id)}>Delete</button>
        </div>
      )}
    </li>
  ))}
</ul>

    </div>
  );
};

export default TodoApp;
