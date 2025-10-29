import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Identification from './pages/Identification'
import Payment from './pages/Payment'
import ProtectedRoute from './components/ProtectedRoute'

const MockPage = ({ title }) => (
    <div style={{ padding: '20px 20px', marginTop: '50px' }}>
        <h2>{title}</h2>
        <p>Conteúdo da página {title}</p>
    </div>
)

function AppRoutes() {
    return (
        <Routes>
            {/* Rotas Publicas */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails title="Detalhes do Produto" />} />
            <Route path="/cart" element={<Cart title="Carrinho de Compras" />} />

            {/* Rotas PRotegias */}
            <Route path="/identification" element={<ProtectedRoute><Identification title="Identificação" /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment title="Pagamento" /></ProtectedRoute>} />
            <Route path="*" element={<MockPage title="404 Not Found" />} />
        </Routes>
    )
}

export default AppRoutes