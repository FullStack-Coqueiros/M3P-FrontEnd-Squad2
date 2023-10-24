import { URL_API } from "../services"

export async function getExames(){
    const res = await fetch(`${URL_API}/exames`)
    const response = await res.json()
    return response    
}

// export async function criarExames(formData) {
//     console.log(formData)
//     fetch(`${URL_API}/exames`, {
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