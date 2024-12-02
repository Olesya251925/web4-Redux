import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./share_task.scss";
import { closeShareModal } from "../../store/slices/taskSlice";

const ShareModal = () => {
  const dispatch = useDispatch();
  const { sharedTask } = useSelector((state) => state.tasks);

  const handleClose = () => {
    dispatch(closeShareModal());
  };

  const handleCopyClick = () => {
    if (sharedTask) {
      const textToCopy = `${sharedTask.title}\n${sharedTask.about}`;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("Текст скопирован в буфер обмена");
          handleClose();
        })
        .catch((err) => {
          console.error("Ошибка при копировании текста: ", err);
        });
    }
  };

  if (!sharedTask) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-share" onClick={(e) => e.stopPropagation()}>
        <div className="modal-share-content">
          <button className="share-button" onClick={handleCopyClick}>
            <img src="src/icons/copy.png" alt="Copy" />
          </button>
          <button className="share-button">
            <img src="src/icons/vk.png" alt="Share VK" />
          </button>
          <button className="share-button">
            <img src="src/icons/telegram.png" alt="Share Telegram" />
          </button>
          <button className="share-button">
            <img src="src/icons/whatsapp.png" alt="Share WhatsApp" />
          </button>
          <button className="share-button">
            <img src="src/icons/facebook.png" alt="Share Facebook" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
