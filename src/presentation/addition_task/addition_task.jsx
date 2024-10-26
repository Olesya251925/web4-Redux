import React, { useState } from 'react';
import './addition_task.scss';

const AdditionTask = ({ taskTitle, taskAbout, onDelete, onEdit }) => {
    const [showIcons, setShowIcons] = useState(false);

    const handleShareClick = () => {
        // Logic for Share button
    };

    const handleEditClick = () => {
        // Call the onEdit prop function passed from CreateTask
        onEdit({ title: taskTitle, about: taskAbout });
    };

    const handleInfoClick = () => {
        // Logic for Info button
    };

    const handleDeleteClick = () => {
        onDelete();
    };

    return (
        <div
            className="custom-task-container"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
        >
            <div className="task-content">
                <h3 className="task-title">{taskTitle}</h3>
                <p className="task-about">{taskAbout}</p>
            </div>

            {showIcons && (
                <div className="icons-container">
                    <button className="action-button" onClick={handleShareClick}>
                        <img src="src/icons/sharee.png" alt="Share" className="action-icon" />
                    </button>
                    <button className="action-button" onClick={handleEditClick}>
                        <img src="src/icons/edit.png" alt="Edit" className="action-icon" />
                    </button>
                    <button className="action-button" onClick={handleInfoClick}>
                        <img src="src/icons/info.png" alt="Info" className="action-icon" />
                    </button>
                </div>
            )}

            <button className="action-button delete-button" onClick={handleDeleteClick}>
                <img src="src/icons/cross.png" alt="Delete" className="action-icon" />
            </button>
        </div>
    );
};

export default AdditionTask;
