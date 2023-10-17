import { Button, Navbar } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";


function CriarConta() {
    const navigate = useNavigate()
    return (
        <>
            < Navbar />
            <h1>Nóss desculpe!</h1>
            <p> Infelizmente não será possível completar sua solicitação!
                <br>Por favor, entre em contato com um administrador para novo cadastro!</br></p>
            <Button type="submit" onClick={() => {
                navigate("/login");
            }}
                variant="primary" id="btnLogin">Voltar para o início</Button>
        </>
    );
}

export default CriarConta;