export const formatCurrency = (number) => {
    if (typeof number !== 'number' || isNaN(number)) {
        return 'R$ 0,00';
    }

    return number.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
    })
}