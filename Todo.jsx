import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (text.trim() !== '') {
      setTodos([...todos, text]);
      setText('');
    }
  };

  const updateTodo = (index) => {
    if (editText.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[index] = editText;
      setTodos(updatedTodos);
      setEditIndex(-1);
      setEditText('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => updateTodo(index)}>Update</button>
                <button onClick={() => setEditIndex(-1)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{todo}</p>
                <button onClick={() => setEditIndex(index)}>Edit</button>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
