import { useContext } from 'react';
import {AppContext} from '../context/AppProvider'

export async function CheckLogin(tentativaLogin) {
    const {setToken} = useContext(AppContext);
    const dados = JSON.stringify(tentativaLogin);
    try {
        const response = await fetch('https://localhost:7083/api/Usuario/login',{
            method :'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dados
        })
        if (response.ok) {
            alert("Solicitação bem sucedida.");
            const responseData = await response.json(); 

            const token = responseData.token;
            console.log(token);
            setToken(token);
            return token; 
        } else {
            return null;
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