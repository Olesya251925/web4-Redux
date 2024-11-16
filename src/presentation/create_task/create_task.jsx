import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, loadTasks } from "../../features/taskSlice";
import TaskInputForm from './task_input_form';
import TaskList from './task_list';
import DeleteModal from "../delete_button/delete";
import EditModal from '../edit/edit';
import ShareModal from '../share/share_task';

const CreateTask = () => {
    const dispatch = useDispatch();
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

    const handleAddClick = (title, about) => {
        if (title.trim() === "" || about.trim() === "") {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        const taskId = Date.now() + Math.random();
        const newTask = { id: taskId, title, about };

        dispatch(addTask(newTask));
        localStorage.setItem('tasks', JSON.stringify([newTask]));
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

    return (
        <div className="container">
            <TaskInputForm onAddClick={handleAddClick} />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <TaskList
                onDeleteTask={handleDeleteClick}
                onEditTask={handleEditTask}
                onShareTask={handleShareClick}
                onToggleExpand={handleToggleExpand}
            />
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
