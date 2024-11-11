import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    isShareModalOpen: false,
    sharedTask: null,
    isDeleteModalOpen: false,
    taskToDelete: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        loadTasks: (state, action) => {
            state.tasks = action.payload;
        },
        reorderTasks: (state, action) => {
            const [movedTask] = state.tasks.splice(action.payload.sourceIndex, 1);
            state.tasks.splice(action.payload.destinationIndex, 0, movedTask);
        },
        // Добавляем новые действия для управления модальными окнами
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
    closeDeleteModal
} = taskSlice.actions;

export default taskSlice.reducer;