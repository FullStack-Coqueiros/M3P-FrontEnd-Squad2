import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/useAppContext";
import Sidebar from "../components/Sidebar";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";


//validar email, telefone e cpf

function CadastroUsuario() {

  const { handleAdicionarUsuario } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const usuario = {
      ...data,
      id: uuidv4(),
    };

    handleAdicionarUsuario(usuario);
    setIsSaved(true);
    setShowSuccessAlert(true);
  }

  return (
    <div>
      <Sidebar />
      <Container>


        <h1>INFORME OS CAMPOS PARA CADASTRAR Usuário</h1>
        <section className="form-med">
          <form onSubmit={handleSubmit(onSubmit)}>

             <Form.Group name="nome">
                <Form.Label>Nome Completo:</Form.Label>
                <Form.Control type="text" placeholder="Nome completo" {...register("nome", { required: true, minLength: 8, maxLength: 64 })} />
                {errors.nome && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="cpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control type="" placeholder="CPF" {...register("cpf", { required: true })} />
                {errors.cpf && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group> 

              <Form.Group name="telefone">
                <Form.Label>Telefone:</Form.Label>
                <Form.Control type="" placeholder="Telefone" {...register("telefone", { required: true })} />
                {errors.telefone && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group> 

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

              <Form.Group name="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Digite seu email" {...register("Email", { required: true })} />
                {errors.email && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="senha">
                <Form.Label>Senha:</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" {...register("Senha", { required: true, minLength: 6})} />
                {errors.senha && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

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


            <div >
              <Button className="btn-salvar" type="submit" > Salvar </Button>
            </div>

          </form>

          {showSuccessAlert && (<div className="alert alert-success mt-3"> Usuário cadastrado com sucesso! </div> )}

        </section>
      </Container>
     
    </div>
  )
}

export default CadastroUsuario