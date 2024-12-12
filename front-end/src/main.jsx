import React from 'react'
import ReactDOM from 'react-dom/client'
import Navigation from './Components/Navigations/Navigation.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import StudentClassDetailDashboard from './Components/Pages/Students/StudentClassDetailDashboard.jsx';
import StudentClassDetailPage from './Components/Pages/Students/StudentClassDetailPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Navigation /> */}
    <StudentClassDetailDashboard />
    <StudentClassDetailPage />
    <ToastContainer autoClose={1500} />
  </React.StrictMode>,
)
