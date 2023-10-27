import { Button, Navbar } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";



function CriarConta() {
    const navigate = useNavigate()
    return (
        <div>
            < Navbar />
            <h2>Nós desculpe!</h2>
            <h4> Infelizmente não será possível completar sua solicitação! </h4>
                <p>Por favor, entre em contato com um administrador para novo cadastro!</p>
            <Button type="submit" onClick={() => {
                navigate("/");
            }}
                variant="primary" id="btnLogin">Voltar para o início</Button>
        </div>
    );
}

export default CriarConta