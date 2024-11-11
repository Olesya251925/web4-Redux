import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';  // Импортируем наш store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Оборачиваем приложение в Provider */}
      <App />
    </Provider>
  </StrictMode>
);