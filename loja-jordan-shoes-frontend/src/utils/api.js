import productsData from '../data/products.json'

// Função para buscar todos os produtos
export const getProdutcs  = async () => {
    return new Promise(resolve => {
        setTimeout(() => resolve(productsData),300) //Simula o atraso de red
    })
}

// Função para buscar um unico produto pelo id
export const getProdutcById  = async (id) => {
    return new Promise(resolve => {
        const produtc = productsData.find(p => p.id === parseInt(id))
        setTimeout(() => resolve(produtc),300) //Simula o atraso de red
    })
}

export const bucarCep = async (cep) => {
    // Limpa o CEP, deixando apenas números
    const cepLimpo = cep.replace(/\D/g,'')

    // Verifica se o CEP tem o tamanho correto
    if(cepLimpo.length !== 8) {
        return{erro:true, mensagem: "CEP invalido."}
    }

    try {
        const url = `https://viacep.com.br/ws/${cepLimpo}/json/`
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("Naoi foi possivel buscar o CEP")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar CEP", error)
        return { erro: true, mensagem: "Falha na comunicação com o serviço de CEP." }
    }
}