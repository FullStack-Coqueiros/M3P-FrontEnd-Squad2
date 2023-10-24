import { URL_API } from "../services"

export async function getConsultas(){
    const res = await fetch(`${URL_API}/consultas`)
    const response = await res.json()
    return response    
}

// export async function criarConsultas(formData) {
//     console.log(formData)
//     fetch(`${URL_API}/consultas`, {
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