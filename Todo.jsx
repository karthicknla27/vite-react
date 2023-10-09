import React, { useState, useEffect } from 'react';

const TodoApp = () => {
     const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];

  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  // Load todos from local storage when the component mounts
//   useEffect(() => {
//     const storedTodos = JSON.parse(localStorage.getItem('todos'));
//     setTodos(storedTodos);
//   }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, );

  const addTodo = () => {
     {
        const newTodo = {
            id: new Date().getTime(), // Generates a unique id based on current time
            text: text, // Use the text entered by the user
          };
      setTodos([...todos, newTodo]);
      setText('');
    }
  };

  const updateTodo = (id) => {
    if (editText.trim() !== '') {
        const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      );

      setTodos(updatedTodos);
      setEditIndex(-1);
      setEditText('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Like App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
  {todos.map((todo) => (
    <li key={todo.id}>
      {editIndex === todo.id ? (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={() => updateTodo(todo.id)}>Update</button>
          <button onClick={() => setEditIndex(-1)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{todo.text}</p>
          <button onClick={() => setEditIndex(todo.id)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      )}
    </li>
  ))}
</ul>

    </div>
  );
};

export default TodoApp;
