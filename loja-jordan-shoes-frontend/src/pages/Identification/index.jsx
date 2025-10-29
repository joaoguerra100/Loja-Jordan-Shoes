import styles from './Identification.module.css'
import { bucarCep } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ESTADOS_BRASIL = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
    'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ',
    'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

function Identification() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nome: '', email: '', tel: '', cep: '', endereco: '', numero: '',
        bairro: '', complemento: '', cidade: '', estado: '', concordo: false
    })
    const [formsErrors, setFormsErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleCepBlur = async (e) => {
        const cep = e.target.value
        const data = await bucarCep(cep)
        if (data && !data.erro) {
            setFormData(prev => ({
                ...prev,
                endereco: data.logradouro || '',
                bairro: data.bairro || '',
                cidade: data.localidade || '',
                estado: data.uf || '',
            }))
            // Limpa erros relacionados ao endereço se o CEP for valido
            setFormsErrors(prev => ({
                ...prev, endereco: '', bairro: '', cidade: '',
                estado: ''
            }))
        } else {
            setFormsErrors(prev => ({ ...prev, cep: data.mensagem || 'CEP não encontrado.' }))
        }
    }

    const validateField = (name, value) => {
        // valida um unico campo e retorna a mensagem de erro, se ouver
        switch (name) {
            case 'nome':
                return value ? '' : 'Nome completo é obrigatorio'
            case 'email':
                return value ? '' : 'Email é obrigatorio'
            case 'tel':
                return value ? '' : 'Telefone é obrigatorio'
            case 'cep':
                return value ? '' : 'Cep é obrigatorio'
            case 'endereco':
                return value ? '' : 'Endereço é obrigatorio'
            case 'numero':
                return value ? '' : 'Numero é obrigatorio'
            case 'bairro':
                return value ? '' : 'Bairro é obrigatorio'
            case 'cidade':
                return value ? '' : 'Cidade é obrigatorio'
            case 'estado':
                return value ? '' : 'Estado é obrigatorio'
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        const error = validateField(name, value)
        // Atualiza apenas o erro do campo que perdeu o foco
        setFormsErrors(prev => ({
            ...prev,
            [name]: error
        }))
    }

    const validateForm = () => {
        const errors = {}
        if (!formData.nome) errors.nome = "Nome completo é obrigatório."
        if (!formData.email) errors.email = "E-mail é obrigatório."
        if (!formData.tel) errors.tel = "Telefone é obrigatório."
        if (!formData.cep) errors.cep = "CEP é obrigatório."
        if (!formData.endereco) errors.endereco = "Endereço é obrigatório."
        if (!formData.numero) errors.numero = "Número é obrigatório."
        if (!formData.bairro) errors.bairro = "Bairro é obrigatório."
        if (!formData.cidade) errors.cidade = "Cidade é obrigatória."
        if (!formData.estado) errors.estado = "Estado é obrigatório."
        if (!formData.concordo) errors.concordo = "Você deve concordar com os termos."
        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validateForm()
        setFormsErrors(errors)

        if (Object.keys(errors).length === 0) {
            console.log("Formulario valido. enviando dados", formData)
            localStorage.setItem('dadosCliente', JSON.stringify(formData))
            navigate('/payment')
        } else {
            console.log("formulario invalido", errors)
        }
    }

    return (
        <div className={styles.container}>
            <h2>Identificação</h2>
            <p>* campos obrigatórios</p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>


                <div className={styles.inputGroup}>
                    <label htmlFor="nome">Nome completo*</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={formsErrors.nome ? styles.campoInvalido : ''}
                    />
                    {formsErrors.nome && <span className={styles.erro}>{formsErrors.nome}</span>}
                </div>

                {/* ... e-mail, telefone ... */}
                <div className={styles.inputGroup}>
                    <label htmlFor="email">E-mail*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required className={formsErrors.email ? styles.campoInvalido : ''}
                    />
                    {formsErrors.email && <span className={styles.erro}>{formsErrors.email}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="tel">Telefone*</label>
                    <input
                        type="tel"
                        id="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        placeholder="99 99999-9999"
                        onBlur={handleBlur}
                        required className={formsErrors.tel ? styles.campoInvalido : ''}
                    />
                    {formsErrors.tel && <span className={styles.erro}>{formsErrors.tel}</span>}
                </div>

                {/* Campos de Endereço */}
                <div className={styles.inputGroup}>
                    <label htmlFor="cep">CEP*</label>
                    <input
                        type="text"
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={handleChange}
                        onBlur={handleCepBlur}
                        maxLength="9"
                        placeholder="00000-000"
                        required className={formsErrors.cep ? styles.campoInvalido : ''}
                    />
                    {formsErrors.cep && <span className={styles.erro}>{formsErrors.cep}</span>}
                </div>

                {/* ... endereço, numero, bairro, etc. ... */}
                <div className={styles.inputGroup}>
                    <label htmlFor="endereco">Endereço*</label>
                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required className={formsErrors.endereco ? styles.campoInvalido : ''}
                    />
                    {formsErrors.endereco && <span className={styles.erro}>{formsErrors.endereco}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="numero">Número*</label>
                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        value={formData.numero}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={formsErrors.numero ? styles.campoInvalido : ''}
                    />
                    {formsErrors.numero && <span className={styles.erro}>{formsErrors.numero}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="bairro">Bairro*</label>
                    <input
                        type="text"
                        id="bairro"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={formsErrors.bairro ? styles.campoInvalido : ''}
                    />
                    {formsErrors.bairro && <span className={styles.erro}>{formsErrors.bairro}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="complemento">Complemento</label>
                    <input
                        type="text"
                        id="complemento"
                        name="complemento"
                        value={formData.complemento}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="cidade">Cidade*</label>
                    <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={formsErrors.cidade ? styles.campoInvalido : ''}
                    />
                    {formsErrors.cidade && <span className={styles.erro}>{formsErrors.cidade}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="estado">Estado*</label>
                    <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={formsErrors.estado ? styles.campoInvalido : ''}
                    >
                        <option value="">Selecione um estado</option>
                        {ESTADOS_BRASIL.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                    {formsErrors.estado && <span className={styles.erro}>{formsErrors.estado}</span>}
                </div>

                <div className={styles.bloco}>
                    <input
                        type="checkbox"
                        id="concordo"
                        name="concordo"
                        checked={formData.concordo}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="concordo">Concordo com a política de privacidade e os termos de uso.*</label>
                </div>
                {formsErrors.concordo && <span className={styles.erro}>{formsErrors.concordo}</span>}

                <div className={styles.botao}>
                    <button type="submit">Finalizar Cadastro</button>
                </div>
            </form>
        </div>
    )

}

export default Identification