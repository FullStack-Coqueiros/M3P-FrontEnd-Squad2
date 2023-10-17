import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/useAppContext";
import Sidebar from "../components/Sidebar";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";


function CadastroDieta() {

  const { handleAdicionarDieta, pacientes } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const dieta = {
      ...data,
      id: uuidv4(),
    };

    handleAdicionarDieta(dieta);
    setIsSaved(true);
    setShowSuccessAlert(true);
  }

  return (
    <div>
      <Sidebar />
      <Container>


        <h1>INFORME OS CAMPOS PARA CADASTRAR DIETA</h1>
        <section className="form-med">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-section">
              <Form.Group controlId="pacienteId">
                <Form.Label>Selecione o paciente:</Form.Label>
                <Form.Select
                  {...register("pacienteId", { required: true })}
                >
                  <h3>Selecione o paciente</h3>
                  {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nomeCompleto}
                    </option>
                  ))}
                </Form.Select>
                {errors.pacienteId && (<span className="error-message">Campo Obrigatório</span>)}
              </Form.Group>


              <Form.Group name="dieta">
                <Form.Label>Nome da dieta:</Form.Label>
                <Form.Control type="text" placeholder="Nome da dieta" {...register("dieta", { required: true, minLength: 5, maxLength: 100 })} />
                {errors.dieta && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="data">
                <Form.Label>Data:</Form.Label>
                <Form.Control type="date" {...register("data", { required: true })} />
                {errors.data && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="horario">
                <Form.Label>Horário:</Form.Label>
                <Form.Control type="time" defaultValue={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {...register("horario", { required: true })} />
                {errors.horario && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="tipo">
                <Form.Label>Tipo:</Form.Label>
                <Form.Select {...register("tipo", { required: true })} >
                  <option>Selecione</option>
                  <option>Low Carb</option>
                  <option>Dash</option>
                  <option>Paleolítica</option>
                  <option>Cetogênica</option>
                  <option>Dukan</option>
                  <option>Mediterrânea</option>
                  <option>Outra</option>
                </Form.Select>
                {errors.tipo && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="descricao">
                <Form.Label>Descrição:</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Descrição" {...register("descricao", { required: true, minLength: 10, maxLength: 1000 })} />
                {errors.descricao && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

              <Form.Group name="statusSistema">
                <Form.Label>Status do sistema:</Form.Label>
                <Form.Control type="isValid" placeholder="Status do sistema" {...register("statusSistema", { required: true })} />
                {errors.statusSistema && <span className="error-message">Campo Obrigatório</span>}
              </Form.Group>

            </div>

            <div >
              <Button className="btn-salvar" type="submit" > Salvar </Button>
              <Button className="btn-editar" type="button" disable={!handleAdicionarDieta} > Editar </Button>
              <Button className="btn-reset" type="reset" disable={!handleAdicionarDieta} > Deletar </Button>
            </div>

          </form>

          {showSuccessAlert && (<div className="alert alert-success mt-3"> Dieta cadastrada com sucesso! </div> )}

        </section>
      </Container>
     
    </div>
  )
}

export default CadastroDieta