import React, { useState } from 'react'
import './zadanie2.css'
import TaskCard from '../components/TaskCard'
import { useTheme } from './zadanie6'
type Todo = { id: number; text: string };

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Todo[]>([]);
    const [taskAddState, setTaskAddState] = useState<boolean>(false);
    const { theme } = useTheme()
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
          setTasks([...tasks, { id: tasks.length + 1, text: event.currentTarget.value }]);
          setTaskAddState(false);
        }
      }

    const handleAddTask = () => {
        setTaskAddState(!taskAddState);
    }

    const handleDeleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return (
        <div className={`todo-list ${theme}`}>
            <h1>Todo List</h1>
            <button className='add-task-button' onClick={handleAddTask}>Add Task</button>
            {taskAddState && (
                <input 
                    type="text" 
                    placeholder='Add Task' 
                    onKeyDown={handleKeyPress}
                />
            )}
            {tasks.map((task) => (
                <TaskCard 
                    key={task.id} 
                    title={task.text} 
                    onDelete={() => handleDeleteTask(task.id)} 
                />
            ))}
        </div>
    );
}

export default TodoList;