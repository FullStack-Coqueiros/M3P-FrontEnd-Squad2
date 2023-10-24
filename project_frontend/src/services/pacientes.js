import { URL_API } from "../services"

export async function getPacientes(){
    const res = await fetch(`${URL_API}/pacientes`)
    const response = await res.json()
    return response    
}

export async function buscarPorNome2(searchString) {
    const res = await fetch(`${URL_API}/pacientes`)
    const pacientes = await res.json()
    return pacientes.filter(item => item.nome.includes(searchString) || item.cpf.includes(searchString))
}

export async function buscaPorNome(nome) {
    const res = await fetch(`${URL_API}/pacientes?nome=${nome}`)
    const response = await res.json()
    return response
}

// export async function criarPacientes(formData) {
//     console.log(formData)
//     fetch(`${URL_API}/pacientes`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//     }).then((response) => response.json())
//         .then(result => {
//             console.log('Dado salvo. ', result)
//         }).catch(err => {
//             console.log('Erro ao salvar o dado.')
//             console.log(err)
//         })
// }
