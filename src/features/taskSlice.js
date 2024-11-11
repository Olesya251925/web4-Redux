import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
};

const initialState = {
    tasks: loadTasksFromLocalStorage(),
    isShareModalOpen: false,
    sharedTask: null,
    isDeleteModalOpen: false,
    taskToDelete: null,
    errorMessage: ''
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save tasks to localStorage
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        loadTasks: (state, action) => {
            state.tasks = action.payload;
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        reorderTasks: (state, action) => {
            const [movedTask] = state.tasks.splice(action.payload.sourceIndex, 1);
            state.tasks.splice(action.payload.destinationIndex, 0, movedTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        openShareModal: (state, action) => {
            state.isShareModalOpen = true;
            state.sharedTask = action.payload;
        },
        closeShareModal: (state) => {
            state.isShareModalOpen = false;
            state.sharedTask = null;
        },
        openDeleteModal: (state, action) => {
            state.isDeleteModalOpen = true;
            state.taskToDelete = action.payload;
        },
        closeDeleteModal: (state) => {
            state.isDeleteModalOpen = false;
            state.taskToDelete = null;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        }
    },
});

export const {
    addTask,
    deleteTask,
    editTask,
    loadTasks,
    reorderTasks,
    openShareModal,
    closeShareModal,
    openDeleteModal,
    closeDeleteModal,
    setErrorMessage
} = taskSlice.actions;

export default taskSlice.reducer;