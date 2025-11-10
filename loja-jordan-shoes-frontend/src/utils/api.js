const API_BASE_URL = 'http://localhost:5165/api'

// Função para buscar todos os produtos
export const getProdutcs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/Produto`)

        if (!response.ok) {
            throw new Error('Falha ao buscar produtos da API.')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar produtos:", error)
        // Retorna um array vazio ou lança o erro para o componente tratar
        throw error
    }
}

// Função para buscar um unico produto pelo id
export const getProdutcById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Produto/${id}`)

        if (!response.ok) {
            throw new Error(`Falha ao buscar o produto com id ${id}.`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Erro ao buscar produto ${id}:`, error)
        throw error
    }
}

export const registerUser = async (email, password, confirmPassword) => {
    const response = await fetch(`${API_BASE_URL}/Usuario/registrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao registrar.')
    }

    return await response.json()
}

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/Usuario/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'E-mail ou senha inválidos.')
    }

    return await response.json()
}

export const createClienteProfile = async (clienteData, token) => {
    const response = await fetch(`${API_BASE_URL}/Cliente`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clienteData)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Falha ao criar perfil de cliente.')
    }

    return await response.json()
}

export const createOrder = async (orderData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Pedido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Não foi possível finalizar o pedido.')
        }

        return await response.json()
    } catch (error) {
        console.error("Erro ao criar pedido:", error)
        throw error
    }
}

export const getMyClienteProfile = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Cliente/meu-perfil`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.status === 404) {
            return null
        }

        if (!response.ok) {
            throw new Error('Falha ao buscar perfil de cliente.')
        }

        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar perfil do cliente:", error)
        throw error
    }
}

// Busca todos os usuários (requer token de admin)
export const getAllUsers = async (token) => {
    const response = await fetch(`${API_BASE_URL}/Usuario`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Falha ao buscar usuários.')
    return await response.json()
}

// Cria um novo produto (requer token de admin)
export const createProduct = async (productData, token) => {
    // Aqui você implementaria a lógica para upload da imagem, se necessário
    // Por enquanto, assumimos que a imagem já está no servidor
    const response = await fetch(`${API_BASE_URL}/Produto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
    })
    if (!response.ok) throw new Error('Falha ao criar produto.')
    return await response.json()
}

// Função para ATUALIZAR um produto (requer token de Admin)
export const updateProduct = async (productId, productData, token) => {
    const response = await fetch(`${API_BASE_URL}/Produto/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
    })
    if (!response.ok) throw new Error('Falha ao atualizar produto.')
    return await response.json()
};

// Deleta um produto (requer token de admin)
export const deleteProduct = async (productId, token) => {
    const response = await fetch(`${API_BASE_URL}/Produto/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    if (response.status !== 204) {
        throw new Error('Falha ao deletar produto.');
    }
    return true;
}

export const bucarCep = async (cep) => {
    // Limpa o CEP, deixando apenas números
    const cepLimpo = cep.replace(/\D/g, '')

    // Verifica se o CEP tem o tamanho correto
    if (cepLimpo.length !== 8) {
        return { erro: true, mensagem: "CEP invalido." }
    }

    try {
        const url = `https://viacep.com.br/ws/${cepLimpo}/json/`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Naoi foi possivel buscar o CEP")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar CEP", error)
        return { erro: true, mensagem: "Falha na comunicação com o serviço de CEP." }
    }
}