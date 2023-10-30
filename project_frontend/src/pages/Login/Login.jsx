import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Form, Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CheckLogin } from "../../services/Login";
import {AppContext} from '../../context/AppProvider'
import { useContext } from "react";



const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const schema = object({
  email: string()
  .required("Campo Obrigatório.")
  .matches(emailRegex, "Digite um email válido."),
  senha: string()
  .required("Campo Obrigatório.")
  .min(6, "A senha precisa ter 6 ou mais caracteres."),
});


function Login() {
  const navigate = useNavigate();
  const {token, setToken} = useContext(AppContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, 
  } = useForm({ resolver: yupResolver(schema) });

  const criarUsuario = async () => {
    const { email, senha } = getValues();
    console.log("Criar usuario")
    const tentativaLogin = {
      Email: email,
      Senha: senha,
      Logado: false
    };

    try {
      const resposta = await CheckLogin(tentativaLogin);
      if (resposta == null) {
        alert("Usuário não encontrado");
      } else {
        console.log(resposta);
        setToken(resposta);
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Erro ao fazer login:', error.message);
    }

  }
  return (
    <div>
      <Navbar />
  
      <section className="area-login">
        <div className="container mt-5">
        <img  src="/src/assets/images/logo_mc.jpeg" class="rounded float-left" alt="Logo" />
          <h2>Login</h2>
        <form className="form-login" onSubmit={handleSubmit(criarUsuario)}>
         
        
          <Form.Group className="col-8" controlId="Email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Digite seu email" {...register("email")} />
            <span className="errors">{errors?.email?.message}</span>
          </Form.Group>
      
       
          <Form.Group className="col-8" controlId="Senha">
            <Form.Label>Senha:</Form.Label>
            <Form.Control type="password" placeholder="Digite sua senha" {...register("senha")} />
            <span className="errors">{errors?.password?.message}</span>
          </Form.Group>
    

          <div>
          <Button type="submit" variant="primary" id="btnLogin"> Entrar! </Button>
          </div>

          <div>
          <a className="btn btn-secondary" href="/criarconta">Criar Conta</a>
          </div>

          <div>
            <Link to="resetsenha">Esqueceu sua senha?</Link>
          </div>
          
        </form>
      </div>
      </section>
    </div>
  );
}

export default Login;