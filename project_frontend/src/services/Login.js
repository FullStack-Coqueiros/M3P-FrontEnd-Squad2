import { URL_API } from "."

export async function CheckLogin(Email, Senha) {
    const resposta = await fetch(`${URL_API}/usuarios`)
    const usuarios = await resposta.json()
    const usuario = usuarios.find(usuario => 
                                    usuario.Email === Email 
                                    && usuario.Senha === Senha)
    
    return usuario
}