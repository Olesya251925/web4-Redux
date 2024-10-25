import React, { useEffect, useState } from 'react';
import plusIcon from '../../icons/plus.png';
import crossIcon from '../../icons/cross.png';
import DeleteModal from "../delete_button/delete";


const CreateTask = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const handleAddClick = () => {
        if (title.trim() === "" || about.trim() === "") {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        const taskId = Date.now() + Math.random();
        const newTask = { id: taskId, title, about };

        setTasks((prevTasks) => [...prevTasks, newTask]);
        saveTasks([...tasks, newTask]);
        setTitle('');
        setAbout('');
    };

    const saveTasks = (updatedTasks) => {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const loadTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    };

    const handleDeleteClick = (taskId) => {
        setTaskToDelete(taskId);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (taskToDelete) {
            const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
            setTaskToDelete(null);
        }
        setIsModalOpen(false);
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setTaskToDelete(null);
    };

    return (
        <div className="container">
            {/* Input fields and Add button */}
            <div className="input-container-wrapper">
                <div className="input-container">
                    <input
                        type="text"
                        id="titleInput"
                        className="input-field"
                        placeholder="Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        id="aboutInput"
                        className="input-field"
                        placeholder="About..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                </div>
                <button className="add-button" onClick={handleAddClick}>
                    <img src={plusIcon} alt="Add" className="add-icon" />
                </button>
            </div>

            {/* Task list */}
            <div id="taskMessage" className="task-message-container">
                {tasks.length === 0 ? (
                    <div className="task-message">
                        <hr className="task-line" />
                        <span id="noTaskMessage">No tasks</span>
                        <hr className="task-line" />
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="task-container" data-id={task.id}>
                            <div className="task-container-text">
                                <h3 className="task-title">{task.title}</h3>
                                <p className="task-about" title={task.about}>
                                    {task.about.length > 50
                                        ? task.about.substring(0, 50) + "..."
                                        : task.about}
                                </p>
                            </div>
                            <div className="delete-button" onClick={() => handleDeleteClick(task.id)}>
                                <img src={crossIcon} alt="Удалить" />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal for delete confirmation */}
            {isModalOpen && (
                <DeleteModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default CreateTask;
