import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cohere from './Models/Cohere';
import GPT3 from './Models/GPT3';

const router = createBrowserRouter([
  {
    element: <Cohere />,
    path: "cohere"
  }, 
  {
    element: <GPT3 />,
    path: "gpt3"
  },
  {
    element: <App />,
    path: "/"
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
