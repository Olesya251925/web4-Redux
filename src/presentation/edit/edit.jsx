import React, { useEffect } from "react";
import "./edit.scss";
import { useSelector, useDispatch } from "react-redux";
import { editTask } from "../../store/slices/taskSlice";

export default function EditModal({ isOpen, onClose, task }) {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.tasks.errorMessage);
  const [title, setTitle] = React.useState(task.title);
  const [about, setAbout] = React.useState(task.about);

  useEffect(() => {
    setTitle(task.title);
    setAbout(task.about);
  }, [task]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (!title || !about) {
      dispatch({
        type: "tasks/setErrorMessage",
        payload: "Please fill in all fields!",
      });
      return;
    }

    dispatch(editTask({ ...task, title, about }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errorMessage)
              dispatch({ type: "tasks/setErrorMessage", payload: "" });
          }}
          placeholder="Mini Input"
          className="modal-input"
        />
        <textarea
          value={about}
          onChange={(e) => {
            setAbout(e.target.value);
            if (errorMessage)
              dispatch({ type: "tasks/setErrorMessage", payload: "" });
          }}
          placeholder="Max Input"
          className="modal-textarea"
        />
        <div className="modal-buttons">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
        {errorMessage && (
          <div id="error-message" className="error-container">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
