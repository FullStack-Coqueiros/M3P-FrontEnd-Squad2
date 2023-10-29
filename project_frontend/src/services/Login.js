import { URL_API } from "."

export async function CheckLogin(tentativaLogin) {
    console.log("Antes do stringify");

    const dados = JSON.stringify(tentativaLogin);
    console.log("Tentou a busca");
    try {
        const response = await fetch('https://localhost:7083/api/Usuario/login',{
            method :'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dados
        })
        if (response.ok) {
            alert("Solicitação bem sucedida.");
            const responseData = await response.json(); 

            const token = responseData.tokenJwt;
            return token; 
        } else {
            alert('Erro ao criar o post.');
        }
    } catch (error) {
        alert('Erro na solicitação:', error.message);
    }
    // const usuarios = await resposta.json()
    // const usuario = usuarios.find(usuario => 
    //                                 usuario.Email === tentativaLogin.Email 
    //                                 && usuario.Senha === tentativaLogin.Senha)
    
    // return usuario
}