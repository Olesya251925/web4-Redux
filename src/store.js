import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/taskSlice';

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

export default store;