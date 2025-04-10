import React from 'react'
import ReactDOM from 'react-dom/client'
import Navigation from './Components/Navigations/Navigation.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navigation />
    <ToastContainer autoClose={1500} />
  </React.StrictMode>,
)
