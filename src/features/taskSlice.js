import { createSlice } from '@reduxjs/toolkit';

// Функция для загрузки задач из localStorage
const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
};

const initialState = {
    tasks: loadTasksFromLocalStorage(),  // Загружаем задачи из localStorage при инициализации
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
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Сохраняем задачи в localStorage
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Обновляем localStorage
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
                localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Обновляем localStorage
            }
        },
        loadTasks: (state, action) => {
            state.tasks = action.payload;
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Сохраняем задачи в localStorage
        },
        reorderTasks: (state, action) => {
            const [movedTask] = state.tasks.splice(action.payload.sourceIndex, 1);
            state.tasks.splice(action.payload.destinationIndex, 0, movedTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Обновляем localStorage
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
