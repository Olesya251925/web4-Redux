import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './delete.scss';
import { deleteTask, closeDeleteModal } from '../../features/taskSlice';

const DeleteModal = () => {
    const dispatch = useDispatch();
    const { taskToDelete } = useSelector(state => state.tasks);

    // Обработчик для подтверждения удаления
    const handleConfirm = () => {
        if (taskToDelete) {
            dispatch(deleteTask(taskToDelete));
            dispatch(closeDeleteModal());
        }
    };

    // Обработчик для отмены удаления
    const handleCancel = () => {
        dispatch(closeDeleteModal());
    };

    if (!taskToDelete) return null;

    return (
        <div className="modal-button-delete">
            <div className="modal-content-button-delete">
                <div className="modal-border-top-button-delete"></div>
                <div className="modal-header-button-delete">
                    <h3 style={{ color: '#FFFFFF', textAlign: 'center' }}>Delete this task?</h3>
                </div>
                <div className="modal-buttons-button-delete">
                    <button className="button-button-delete" onClick={handleConfirm}>Yes</button>
                    <button className="button-button-delete" onClick={handleCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;