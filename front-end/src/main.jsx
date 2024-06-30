import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Navigation from './Components/Navigations/Navigation.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navigation />
  </React.StrictMode>,
)
