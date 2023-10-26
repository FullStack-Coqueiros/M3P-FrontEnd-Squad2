import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../context/useAppContext";
import Sidebar from "../../components/SidebarComponents/Sidebar";


function CadastroUsuario() {

  const { handleAdicionarUsuario, carregarUsuario } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const {register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    carregarUsuario();
  }, []);

  function criarUsuario(usuario) {
    const novoUsuario = {
      ...usuario,
    }
    handleAdicionarUsuario(novoUsuario);
    setIsSaved(true);
    setShowSuccessAlert(true);

    // Limpar o formulário
    reset();
    // Imprimir os dados no console
    console.log('Dados do usuário:', usuario);
  }


  return (
    <div>
    <Sidebar />
      <Container>
       <section className="form-med">
        <div className="container mt-5">
          <h2>INFORME OS CAMPOS PARA CADASTRAR USUÁRIO</h2>
            <form onSubmit={handleSubmit(criarUsuario)}>
          
            <div className="row mb-4">
                <div className="col-8">

             <Form.Group name="nome">
                <Form.Label>Nome Completo:</Form.Label>
                <Form.Control type="text" placeholder="Nome completo" {...register("nome", { required: true, minLength: 8, maxLength: 64 })} />
                {errors.nome && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              </div>

              <div className="col-2">
              <Form.Group name="cpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control type="" placeholder="CPF" {...register("cpf", { required: true, pattern: { value: /^(\d{3}\.){3}\d{3}\-\d{2}$/} })} />
                {errors.cpf && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group> 
              </div>

              <div className="col-2">
              <Form.Group name="telefone">
                <Form.Label>Telefone:</Form.Label>
                <Form.Control type="" placeholder="Telefone" {...register("telefone", { required: true, pattern: { value: /^\(\d{2}\)\s\d{1}\s\d{4}\s-\s\d{4}/g} })} />
                {errors.telefone && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group> 
              </div>
              </div>

              <div className="row mb-4">
                <div className="col-4">

              <Form.Group name="genero">
                <Form.Label>Gênero</Form.Label>
                <Form.Select {...register("genero", { required: true })} >
                  <option>Selecione</option>
                  <option>Feminino</option>
                  <option>Masculino</option>
                  <option>Outro</option>
                </Form.Select>
                {errors.genero && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>
              </div>

              <div className="col-4">
              <Form.Group name="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Digite seu email" {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }})} />
                {errors.email && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>
              </div>

              <div className="col-4">
              <Form.Group name="senha">
                <Form.Label>Senha:</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" {...register("Senha", { required: true, minLength: 6})} />
                {errors.senha && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>
              </div>
              </div>

              
              <div className="row mb-4">
                <div className="col-6">
              <Form.Group name="tipo">
                <Form.Label>Tipo</Form.Label>
                <Form.Select {...register("tipo", { required: true })} >
                  <option>Selecione</option>
                  <option>Médico</option>
                  <option>Enfermeiro</option>
                  <option>Administrador</option>
                </Form.Select>
                {errors.tipo && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>
              </div>
            </div>
          


            <div >
              <Button className="btn-salvar" type="submit" > Salvar </Button>
            </div>

          </form>

          {showSuccessAlert && (<div className="alert alert-success mt-3"> Usuário cadastrado com sucesso! </div> )}

        </div>
        </section>
      </Container>
     
    </div>
  )
}

export default CadastroUsuario