import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { reorderTasks, deleteTask } from "../../store/slices/taskSlice";
import AdditionTask from "../addition_task/addition_task";

const TaskList = ({
  onDeleteTask,
  onEditTask,
  onShareTask,
  onToggleExpand,
}) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    dispatch(reorderTasks({ sourceIndex, destinationIndex }));

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, movedTask);
    localStorage.setItem("tasks", JSON.stringify(reorderedTasks));
  };

  return (
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
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="task-container"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <AdditionTask
                        task={task}
                        onToggleExpand={() => onToggleExpand(task.id)}
                        onDelete={() => onDeleteTask(task.id)}
                        onEdit={() => onEditTask(task)}
                        onShare={onShareTask}
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
  );
};

export default TaskList;
