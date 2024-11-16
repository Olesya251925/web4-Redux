import React, { useState } from 'react';
import plusIcon from '../../icons/plus.png';

const TaskInputForm = ({ onAddClick }) => {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');

    const handleAddClick = () => {
        onAddClick(title, about);
        setTitle('');
        setAbout('');
    };

    return (
        <div className="input-container-wrapper">
            <div className="input-container">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="About..."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />
            </div>
            <button className="add-button" onClick={handleAddClick}>
                <img src={plusIcon} alt="Добавить" className="add-icon" />
            </button>
        </div>
    );
};

export default TaskInputForm;
