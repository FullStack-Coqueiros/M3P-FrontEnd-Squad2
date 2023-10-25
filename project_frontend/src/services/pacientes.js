import { URL_API } from "../services"

export async function getPacientes(){
    const res = await fetch(`${URL_API}/pacientes`)
    const response = await res.json()
    return response    
}

