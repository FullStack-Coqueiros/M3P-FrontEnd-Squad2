import { URL_API } from "../services"

export async function getConsultas(){
    const res = await fetch(`${URL_API}/consultas`)
    const response = await res.json()
    return response    
}
