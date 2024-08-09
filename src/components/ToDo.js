import React, { useState, useEffect } from 'react';
import './ToDo.css';

function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('')

    useEffect(() => {
        const savedTasks =JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, {text: newTask, isDone: false}]);
            setNewTask('');
        }
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };

    const clearAllTasks = () => {
        setTasks([]);
    };

    const toggleTaskDone = (index) => {
        const updatedTasks = tasks.map((task, i) =>
        i === index ? {...tasks, isDone: !task.isDone } : task);
        setTasks(updatedTasks);
    }


  return (
    <div className='todo-container'>
        <input
         type='text'
         value={newTask}
         onChange={(e) => setNewTask(e.target.value)}
         placeholder='Enter a new task'
        />
        <button onClick={addTask}>Add Task</button>
        <button onClick={clearAllTasks} className='clear-button'>Clear All</button>
        <ul>
            {tasks.map((task, index) =>(
                <li key={index} className={task.isDone ? 'done' : ''}>
                    <span onClick={() => toggleTaskDone(index)}>{task.text}</span>
                    <button onClick={() => removeTask(index)}>Remove</button>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default ToDo