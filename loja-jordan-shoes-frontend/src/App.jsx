import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './routes.jsx'
import LoginModal from './components/Modals/LoginModal'
import RegisterModal from './components/Modals/RegisterModal'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

    const handleSwitchToRegister = () => {
        setIsLoginModalOpen(false)
        setIsRegisterModalOpen(true)
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ToastContainer 
                position="top-right"
                autoClose={3000} // Fecha automaticamente após 3 segundos
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            <Header onOpenLogin={() => setIsLoginModalOpen(true)} />

            <main style={{ flexGrow: 1 }}>
                <AppRoutes />
            </main>

            <Footer />

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onSwitchToRegister={handleSwitchToRegister}
            />
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            />
        </div>
    )
}

export default App;