import { URL_API } from "."

export async function CheckLogin(tentativaLogin) {
    const resposta = await fetch(`${URL_API}/usuarios`)
    const usuarios = await resposta.json()
    const usuario = usuarios.find(usuario => 
                                    usuario.Email === tentativaLogin.Email 
                                    && usuario.Senha === tentativaLogin.Senha)
    
    return usuario
}