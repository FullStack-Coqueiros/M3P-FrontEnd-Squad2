import { useContext } from 'react';


export async function CheckLogin(tentativaLogin) {
    
    try {
        const dados = JSON.stringify(tentativaLogin);


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
            return token; 
        } else {
            return null;
        }
    } catch (error) {
        alert('Erro na solicitação:', error.message);
    }
}