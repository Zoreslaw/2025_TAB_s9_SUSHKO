import React, { useState } from 'react';
import TaskCardTest from "../components/TaskCardTest.tsx";

type Todo = { id: number; text: string };

const Test: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");

  console.log(inputText);

  const handleAddTask = () => {
    if (inputText.length) {
      setTasks([...tasks, {id: tasks.length + 1, text: inputText}]);
    }
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
      <div className='todo-list-test'>
        <h1>Todo List</h1>
        <input
            type='text'
            placeholder='Add Task'
            onChange={(e) => setInputText(e.target.value)}
        />
        <button className='add-task-button-test' onClick={handleAddTask}>Add Task</button>
        { tasks.map((task) => (
            <TaskCardTest
                key={task.id}
                title={task.text}
                onDelete={() => handleDeleteTask(task.id)}
            />
        ))}
      </div>
  );
};

export default Test;

// Skibidi Sigma Pomni Digital Fortnite Chamba Free Gigachad Rizz Ohmygodfloo XXXTentacion Hotmail Lionel Ronaldo Junior Mewing Tercero Chiki Ibai Xocas Ete Sech Golden Toy Puppet Ohio Rubén Tuesta YouTubeproinsano Globodetexto51 Decadencia777