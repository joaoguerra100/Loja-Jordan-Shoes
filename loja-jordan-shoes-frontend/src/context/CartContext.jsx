import React, { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (product, size) => {
        // Cria um novo item para o carrinho com um ID único (produto + tamanho)
        const newItem = { ...product, size, cartId: `${product.id}-${size}` }

        setCart(prevCart => [...prevCart, newItem])
    }

    const removeFromCart = (cartId) => {
        setCart(prevCart => prevCart.filter(item => item.cartId !== cartId))
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart,clearCart, cartItemCount: cart.length }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => useContext(CartContext)