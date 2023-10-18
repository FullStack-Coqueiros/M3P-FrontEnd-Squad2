import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { Form, Button, Navbar, } from 'react-bootstrap';


//precisa resetar a senha

const schema = object({
    email: string().required("Campo Obrigatório."),
    password: string().required("Campo Obrigatório.").min(6, "A senha precisa de 6 ou mais caracteres."),
})

function criarSenha(data) {
    console.log(data);
}

function RecuperarSenha() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    return (
        <>
            <Navbar />
                <h1>Esqueceu sua senha?</h1>
                <section className="area-login">
                <form className="form-login" onSubmit={handleSubmit(criarSenha)}>
                <img  src="/src/assets/images/logo.jpeg" alt="Logo"   />

                <h5>Digite o E-mail cadastrado para redefinição de senha:</h5>

                    <Form.Group className="col-8" controlid="Email">
                        <Form.Label>E-mail:</Form.Label>
                        {/* <Form.Control type="email" placeholder="Digite seu email" {...register("Email", { required: true })} /> */}
                        <Form.Control type="email" placeholder="Digite seu email" {...register("email", { required: true })} />

                        {errors.email && <span>Campo Obrigatório</span>}

                    </Form.Group>
                    <Button type="submit" onClick={() => alert('E-mail enviado com sucesso!')} variant="primary" id="btnLogin">Continuar</Button>
                </form>
            </section>
        </>
    )
}

export default RecuperarSenha;