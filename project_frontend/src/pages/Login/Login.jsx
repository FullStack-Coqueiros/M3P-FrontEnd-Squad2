import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Form, Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const schema = object({
  Email: string()
    .required("Campo Obrigatório.")
    .matches(emailRegex, "Digite um email válido."),
  Senha: string()
    .required("Campo Obrigatório.")
    .min(6, "A senha precisa ter 6 ou mais caracteres."),
});

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const criarUsuario = async (event) => {
    event.preventDefault()
    const resposta = await CheckLogin(Email, Password)
    if (!resposta) {
      return Alert.alert("usuário não encontrado");
    }
    navigate('/inicio')
}

  function onSubmit() {
    handleSubmit(criarUsuario);
  }


  return (
    <div>
      <Navbar />
      <h1>Medical Care:</h1>
      <div className="text">
        <h3>deseja boas vindas!</h3>
      </div>
      <section className="area-login">
        <form className="form-login" onSubmit={onSubmit}>
        <img  src="/src/assets/images/login.jpeg" alt="Logo" />


          <h2>Login</h2>
          <Form.Group className="col-8" controlId="Email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Digite seu email" {...register("Email")} />
            <span className="errors">{errors?.email?.message}</span>
          </Form.Group>

          <Form.Group className="col-8" controlId="Senha">
            <Form.Label>Senha:</Form.Label>
            <Form.Control type="password" placeholder="Digite sua senha" {...register("Senha")} />
            <span className="errors">{errors?.password?.message}</span>
          </Form.Group>

          <Button type="submit" variant="primary" id="btnLogin"> Entrar! </Button>
          <a className="btn btn-light" href="/user">Criar Conta</a>
          <Link to="RecuperarSenha">Esqueceu sua senha?</Link>

        </form>
      </section>
    </div>
  );
}

export default Login;