import React from 'react';
import './delete.scss';

const DeleteModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal-button-delete">
            <div className="modal-content-button-delete">
                <div className="modal-border-top-button-delete"></div>
                <div className="modal-header-button-delete">
                    <h3 style={{ color: '#FFFFFF', textAlign: 'center' }}>Delete this task?</h3>
                </div>
                <div className="modal-buttons-button-delete">
                    <button className="button-button-delete" onClick={onConfirm}>Yes</button>
                    <button className="button-button-delete" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
