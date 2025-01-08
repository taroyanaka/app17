'use client'; // ファイルの最上部に追加

import React, { useEffect, useState } from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const handleAddTask = async () => {
    if (inputValue.trim() === '') return;
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputValue }),
    });
    setInputValue('');
    const res = await fetch('/api/tasks');
    setTasks(await res.json());
  };

  const handleToggleTask = async (id: number) => {
    await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const res = await fetch('/api/tasks');
    setTasks(await res.json());
  };

  const handleDeleteTask = async (id: number) => {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const res = await fetch('/api/tasks');
    setTasks(await res.json());
  };

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>ToDo App2</h1>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            marginLeft: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: task.completed ? '#d4edda' : '#f8d7da',
            }}
          >
            <span
              onClick={() => handleToggleTask(task.id)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                flex: 1,
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              style={{
                marginLeft: '0.5rem',
                padding: '0.3rem 0.6rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}


