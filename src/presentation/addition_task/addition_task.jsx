import React, { useState } from 'react';
import './addition_task.scss';

const AdditionTask = ({ taskTitle, taskAbout, onDelete, onEdit, onShare }) => {
    const [showIcons, setShowIcons] = useState(false);

    const handleShareClick = () => {
        // Вызываем функцию onShare, передавая текущую задачу
        onShare({ title: taskTitle, about: taskAbout });
    };

    const handleEditClick = () => {
        onEdit({ title: taskTitle, about: taskAbout });
    };

    const handleInfoClick = () => {
        // Логика для кнопки Info
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

            <button className="action-button delete-button" onClick={onDelete}>
                <img src="src/icons/cross.png" alt="Delete" className="action-icon" />
            </button>
        </div>
    );
};

export default AdditionTask;