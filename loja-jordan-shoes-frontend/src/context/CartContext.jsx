import React, { createContext, useContext, useMemo, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (product, size) => {
        // Cria um ID único para o item (combinação de ID do produto e tamanho)
        const cartId = `${product.id}-${size}`

        // Verifica se um item EXATAMENTE IGUAL (mesmo produto, mesmo tamanho) já existe
        const existingItem = cart.find(item => item.cartId === cartId)

        if(existingItem) {
            // Se ja existe, apenas aumenta a quantidade
            setCart(prevCart => 
                prevCart.map(item =>
                    item.cartId === cartId
                    ? {...item, quantidade: item.quantidade + 1}
                    : item
                )
            )
        } else {
            const newItem = {...product, size, cartId, quantidade: 1}
            setCart(prevCart => [...prevCart, newItem])
        }
    }

    const removeFromCart = (cartId) => {
        setCart(prevCart => prevCart.filter(item => item.cartId !== cartId))
    }

    const clearCart = () => {
        setCart([])
    }

    // Recalcula o total sempre que o carrinho mudar
    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => total + (item.preco * item.quantidade), 0)
    }, [cart])

    // Conta o número total de itens (somando as quantidades)
    const cartItemCount  = useMemo(() => {
        return cart.reduce((count,item) => count + item.quantidade, 0)
    }, [cart])

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, cartItemCount }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => useContext(CartContext)