import React, { useState } from 'react';
import './addition_task.scss';

const AdditionTask = ({ taskTitle, taskAbout, onDelete }) => {
    const [showIcons, setShowIcons] = useState(false);

    const handleShareClick = () => {
        // Логика для кнопки "Поделиться"
        openShareModal(taskTitle, taskAbout);
    };

    const handleEditClick = () => {
        // Логика для кнопки "Редактировать"
        openEditModal();
    };

    const handleInfoClick = () => {
        // Логика для кнопки "Инфо"
    };

    const handleDeleteClick = () => {
        // Вызываем функцию onDelete, переданную из родительского компонента
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
                    <button className="action-button" onClick={handleShareClick} id="shareIcon">
                        <img src="src/icons/sharee.png" alt="Share" className="action-icon" />
                    </button>
                    <button className="action-button" onClick={handleEditClick} id="editIcon">
                        <img src="src/icons/edit.png" alt="Edit" className="action-icon" />
                    </button>
                    <button className="action-button" onClick={handleInfoClick} id="infoIcon">
                        <img src="src/icons/info.png" alt="Info" className="action-icon" />
                    </button>
                </div>
            )}

            {/* Кнопка Удалить, расположенная в custom-task-container */}
            <button className="action-button delete-button" onClick={handleDeleteClick} id="deleteIcon">
                <img src="src/icons/cross.png" alt="Delete" className="action-icon" />
            </button>
        </div>
    );
};

export default AdditionTask;
