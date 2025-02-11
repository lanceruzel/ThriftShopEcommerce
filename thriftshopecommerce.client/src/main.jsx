import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import './css/bootstrap.css';
import './js/bootstrap.js';
import App from './App.jsx'
import { AuthProvider } from './lib/auth/AuthContext'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <StrictMode>
            <App />
        </StrictMode>
    </AuthProvider>

)
