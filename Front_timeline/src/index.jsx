import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import reportWebVitals from './reportWebVitals';
import { router } from './router/router.jsx';
import { RouterProvider } from 'react-router-dom';
import PeriodProvider from './component/PeriodProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PeriodProvider>
      <RouterProvider router={router} />
    </PeriodProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
