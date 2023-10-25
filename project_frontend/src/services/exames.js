import { URL_API } from "../services"

export async function getExames(){
    const res = await fetch(`${URL_API}/exames`)
    const response = await res.json()
    return response    
}
