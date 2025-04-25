import React from 'react'
import './TaskCard.css'

interface TaskCardProps {
    title: string;
    onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, onDelete }) => {
    return (
        <div className='task-card'>
            <h3>{title}</h3>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}


export default TaskCard;