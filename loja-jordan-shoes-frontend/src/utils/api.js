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

export const createClienteProfile = async (clienteData, token) => {
    const response = await fetch(`${API_BASE_URL}/cliente`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clienteData)
    })

    if(!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.message || 'Falha ao criar perfil de cliente.')
    }

    return await response.json()
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