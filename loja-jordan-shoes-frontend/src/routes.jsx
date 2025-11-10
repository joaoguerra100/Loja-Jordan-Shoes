import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Identification from './pages/Identification'
import Payment from './pages/Payment'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import AdminRoute from './components/AdminRoute'; // Importa o novo guardião
import AdminLayout from './pages/Admin/AdminLayout'; // O layout do dashboard
import AdminDashboard from './pages/Admin/AdminDashboard'; // A página inicial do admin
import AdminProducts from './pages/Admin/AdminProducts'; // A página de produtos
import AdminUsers from './pages/Admin/AdminUsers'; // A página de usuários

function AppRoutes() {
    return (
        <Routes>
            {/* === ROTAS PÚBLICAS === */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />

            {/* === ROTAS PROTEGIDAS PARA CLIENTES === */}
            <Route path="/identification" element={<ProtectedRoute><Identification /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />

            {/* === ROTAS DE ADMIN (PROTEGIDAS E ANINHADAS) === */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<AdminDashboard />} /> {/* Página inicial do admin */}
                <Route path="products" element={<AdminProducts />} />
                <Route path="users" element={<AdminUsers />} />
                {/* Exemplo de rotas para criar/editar produtos no futuro */}
                {/* <Route path="products/new" element={<ProductForm />} /> */}
                {/* <Route path="products/edit/:productId" element={<ProductForm />} /> */}
            </Route>

            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
            <Route path="/not-found" element={<NotFound />} />

        </Routes>
    )
}

export default AppRoutes