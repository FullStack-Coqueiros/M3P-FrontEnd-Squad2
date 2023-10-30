import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAppContext } from "../../context/useAppContext";
import Sidebar from "../../components/SidebarComponents/Sidebar";
import { URL_API } from '../../services';
import "../../assets/index.css"


function CadastroConsulta() {

  const { handleAdicionarConsulta, pacientes, carregarPacientes, consultas, setConsultas } = useAppContext();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isSaved, setIsSaved] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editar, setEditar] = useState(true);
  const [deletar, setDeletar] = useState(true);

  useEffect(() => {
    carregarPacientes();
  }, []);

  function createConsulta(consulta) {
    const novaConsulta = {
      ...consulta,
      pacienteId: Number(consulta.pacienteId)
    }
    handleAdicionarConsulta(novaConsulta);
    setIsSaved(true);
    setShowSuccessAlert(true);

    // Limpar o formulário
    reset();
    // Imprimir os dados no console
    console.log('Dados da Consulta para o paciente:', consulta);
  }

  const handleDeleteConsulta = async (e, consultaId) => {
    e.preventDefault();
    
    window.confirm("Tem certeza que deseja excluir a consulta?") &&
      apiClient
        .delete(`/consulta/${consultaId}`)
        .then(() => {
          const novasConsultas = consultas.filter((consulta) => consulta.id !== consultaId);
          setConsultas(novasConsultas);
          alert("Consulta excluída com sucesso!");
        })
        .catch((erro) => console.error(erro));
  };

  const handleEditarConsulta = async (e) => {
    e.preventDefault();

    window.confirm("Tem certeza que deseja editar consulta?") &&
      apiClient
        .put(`/consultas/${id}`, consultas)
        .then(() => {
          window.alert("Consulta editada com sucesso!");
          navigate("/");
        })
        .catch((erro) => console.error(erro));
  };

  
  const handlePaciente = async (e, paciente, consultas) => {
    e.preventDefault();

    const novasConsultas = consultas.filter((consulta) => consulta.pacienteId == paciente.Id);
    if(novasConsultas == null || novasConsultas.length == 0 ) {
      setEditar(true);
      setDeletar(true);
      }
    else {
      consultas = novasConsultas[0];
      setEditar(false);
      setDeletar(false);
    }
  }

  return (
    <>
      <Sidebar />
      <Container>
        <section className='form-med'>
          <form onSubmit={handleSubmit(createConsulta)}>
            <h2>Cadastro Consultas</h2>
            <Row>
              <Col>
                <Form.Group controlId="pacienteId">
                    <Form.Label>Selecione o paciente:</Form.Label>
                    <Form.Select
                      {...register("pacienteId", { required: true })}
                    >
                      <option value="">Selecione o paciente</option>
                      {pacientes.map(paciente => (
                        <option key={paciente.id} value={paciente.id}>
                          {paciente.nomeCompleto}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.pacienteId && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="consulta">
                  <Form.Label>Motivo da Consulta</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Digite o motivo da consulta'
                    {...register("consulta", {
                      required: true,
                      minLength: 8,
                      maxLength: 64,
                    })}
                  />
                  {errors.exame && (
                    <span className='error-message'>Campo Obrigatório com 8 a 64 caracteres</span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group name="DataConsulta">
                  <Form.Label>Data da Consulta:</Form.Label>
                  <Form.Control
                    type="date" defaultValue={new Date().toLocaleDateString()}
                    {...register("dataConsulta", { required: true })}
                  />
                  {errors.dataConsulta && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group name="HoraConsulta">
                  <Form.Label>Hora da Consulta:</Form.Label>
                  <Form.Control
                    type="time"

                    {...register("horaConsulta", { required: true })}
                  />
                  {errors.horaConsulta && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group name="descricao">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea" rows={5} placeholder="Descrição" {...register("descricao",
                      {
                        required: true,
                        minLength: 16,
                        maxLength: 1024
                      })} />
                  {errors.descricao && <span className="error-message">Campo Obrigatório com 16 a 1024 caracteres</span>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group name="medicacao">
                  <Form.Label>Medicação Receitada</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Digite a Medicação Receitada'
                    {...register("medicacao", { required: true })}
                  />
                  {errors.medicacao && (
                    <span className='error-message'>Campo obrigatório</span>
                  )}
                </Form.Group>
                <Form.Group name="dosagem">
                  <Form.Label>Dosagem e Precauções</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Digite a Dosagem e as Precauções'
                    {...register("dosagem", {
                      required: true,
                      minLength: 16,
                      maxLength: 256
                    })}
                  />
                  {errors.dosagem && (
                    <span className='error-message'>Campo Obrigatório com 16 a 256 caracteres</span>
                  )}
                </Form.Group>
                <Col>
                  <Form.Group name="statusSistema">
                    <Form.Label>Status do Sistema:</Form.Label>
                    <div>
                      <Form.Check
                        type="radio"
                        label="Ativo"
                        value="Ativo"
                        {...register("statusSistema", { required: "Selecione o status do sistema." })}
                      />
                      <Form.Check
                        type="radio"
                        label="Inativo"
                        value="Inativo"
                        {...register("statusSistema", { required: "Selecione o status do sistema." })}
                      />
                    </div>
                    {errors.statusSistema && (
                      <span className="error-message">{errors.statusSistema.message}</span>
                    )}
                  </Form.Group>
                </Col>

              </Col>
            </Row>
            <div >
              <Button className="btn-salvar" type="submit" > Salvar </Button>
            </div>
            <div>
              <Button disabled={deletar} onClick={(e) => handleDeleteConsulta(e, consultas.id)}>
                Excluir
              </Button>
              <Button disabled={editar} onClick={(e) => handleEditarConsulta(e)}>
                Editar
              </Button>
            </div>
          </form>
          {showSuccessAlert && (<div className="alert alert-success mt-3"> Consulta cadastrada com sucesso! </div>)}
        </section>
      </Container>
    </>
  )
}

export default CadastroConsulta


