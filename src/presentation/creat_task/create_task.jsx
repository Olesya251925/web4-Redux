import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { addTask, deleteTask, editTask, loadTasks, reorderTasks } from "../../features/taskSlice";
import plusIcon from '../../icons/plus.png';
import DeleteModal from "../delete_button/delete";
import AdditionTask from '../addition_task/addition_task';
import EditModal from '../edit/edit';
import ShareModal from '../share/share_task';

const CreateTask = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToShare, setTaskToShare] = useState(null);
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        dispatch(loadTasks(savedTasks));
    }, [dispatch]);

    const handleAddClick = () => {
        if (title.trim() === "" || about.trim() === "") {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        const taskId = Date.now() + Math.random();
        const newTask = { id: taskId, title, about };

        dispatch(addTask(newTask));
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
        setTitle('');
        setAbout('');
    };

    const handleDeleteClick = (taskId) => {
        setTaskToDelete(taskId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (taskToDelete) {
            dispatch(deleteTask(taskToDelete));
            removeTaskFromLocalStorage(taskToDelete.id);
            setTaskToDelete(null);
        }
        setIsDeleteModalOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setTaskToDelete(null);
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (updatedTask) => {
        dispatch(editTask(updatedTask));
        localStorage.setItem('tasks', JSON.stringify(tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        )));
        setIsEditModalOpen(false);
    };

    const handleShareClick = (task) => {
        setTaskToShare(task);
        setIsShareModalOpen(true);
    };

    const handleCloseShareModal = () => {
        setIsShareModalOpen(false);
        setTaskToShare(null);
    };

    const handleToggleExpand = (taskId) => {
        setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        dispatch(reorderTasks({ sourceIndex, destinationIndex }));

        const reorderedTasks = [...tasks];
        const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
        reorderedTasks.splice(destinationIndex, 0, movedTask);
        localStorage.setItem('tasks', JSON.stringify(reorderedTasks));
    };

    return (
        <div className="container">
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

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <div
                            className="task-message-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {tasks.length === 0 ? (
                                <div className="task-message">
                                    <hr className="task-line" />
                                    <span>No tasks</span>
                                    <hr className="task-line" />
                                </div>
                            ) : (
                                tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                className="task-container"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <AdditionTask
                                                    task={task}
                                                    onToggleExpand={() => handleToggleExpand(task.id)}
                                                    onDelete={() => handleDeleteClick(task.id)}
                                                    onEdit={() => handleEditTask(task)}
                                                    onShare={handleShareClick}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))

                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {isDeleteModalOpen && (
                <DeleteModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            {isEditModalOpen && taskToEdit && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    task={taskToEdit}
                    onSave={handleSaveEdit}
                />
            )}

            {isShareModalOpen && taskToShare && (
                <ShareModal
                    title={taskToShare.title}
                    about={taskToShare.about}
                    onClose={handleCloseShareModal}
                />
            )}
        </div>
    );
};

export default CreateTask;
