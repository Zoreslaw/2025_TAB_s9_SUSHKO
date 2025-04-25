import React from 'react'

interface TaskCardTestProps {
    title: string;
    onDelete: () => void;
}

const TaskCardTest: React.FC<TaskCardTestProps> = ({ title, onDelete }) => {
    return (
        <div className="task-card-test">
            <h4>{title}</h4>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}

export default TaskCardTest;