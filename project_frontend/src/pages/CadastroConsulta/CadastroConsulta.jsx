import React, {useEffect, useState} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {useAppContext} from "../../context/useAppContext";
import Sidebar from "../../components/SidebarComponents/Sidebar";
import { URL_API } from '../../services';


function CadastroConsulta() {

  const {handleAdicionarConsulta, handleDeletarConsulta, pacientes, setPacientes, carregarPacientes} = useAppContext();
  const [isSaved, setIsSaved] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const {register, handleSubmit, reset, formState: {errors}} = useForm();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch(`${URL_API}/pacientes`);
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error('Erro ao buscar pacientes', error);
      }
    };
    fetchPacientes();
  }, [setPacientes]);

  function createConsulta(data) {
    const consulta = {
      ...data,
      id: uuidv4(),
    };

    handleAdicionarConsulta(consulta);
    setIsSaved(true);
    setShowSuccessAlert(true);

    // Limpar o formulário
    reset();
    // Imprimir os dados no console
    console.log('Dados da consulta para o paciente:', exame);

    const deletarConsulta = (consultaId) => {

      const consultaParaDeletar = consultas.find((consulta) => consulta.id === consultaId);

      if (consultaParaDeletar) {
        handleDeletarConsulta(consultaId);
      } else {
        console.warn('Tentativa de deletar consulta inexistente.');
      }
    };

  }

  return (
    <>
      <Sidebar />
      <Container>
        <h1>INFORME OS CAMPOS PARA CADASTRO</h1>
        <section className='form-med'>
          <form onSubmit={handleSubmit(createConsulta)}>
            <h2>Cadastro Consultas</h2>
            <Row>
              <Col>

                <div className='form-section'>
                  <Form.Group controlId='pacienteId'>
                    <Form.Label>Selecione o paciente</Form.Label>
                    <Form.Select
                      {...register("pacientId", {required: true})}
                    >
                      <option value="">Selecione o paciente</option>
                      {pacientes.map(paciente => (
                        <option key={paciente.id} value={paciente.id}>
                          {paciente.nomeCompleto}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.pacienteId && (
                      <span className='error-message'>Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>
                
                <Form.Group name="consulta">
                  <Form.Label>Motivo da Consulta</Form.Label>
                  <Form.Control
                    type = "text"
                    placeholder='Digite o motivo da consulta'
                    {...register("consulta", {required: true})}
                  />
                  {errors.exame && (
                    <span className='error-message'>Campo obrigatório</span>
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
                  <Form.Label>Hora da Consulta</Form.Label>
                  <Form.Control
                    type="time" defaultValue={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                  <Form.Control as="textarea" rows={5} placeholder="Descrição" {...register("descricao", { required: true, minLength: 10, maxLength: 1000 })} />
                  {errors.descricao && <span className="error-message">Campo Obrigatório</span>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group name="medicacao">
                    <Form.Label>Medicação Receitada</Form.Label>
                    <Form.Control
                      type = "text"
                      placeholder='Digite a Medicação Receitada'
                      {...register("medicacao", {required: true})}
                    />
                    {errors.medicacao && (
                      <span className='error-message'>Campo obrigatório</span>
                    )}
                  </Form.Group> 
                  <Form.Group name="dosagem">
                    <Form.Label>Dosagem e Precauções</Form.Label>
                    <Form.Control
                      type = "text"
                      placeholder='Digite a Dosagem e as Precauções'
                      {...register("dosagem", {required: true})}
                    />
                    {errors.dosagem && (
                      <span className='error-message'>Campo obrigatório</span>
                    )}
                  </Form.Group> 
                    <Form.Group name="statusSistema">
                    <Form.Label>Status do sistema</Form.Label>
                    <Form.Control type="isValid" placeholder="Status do sistema" {...register("statusSistema", { required: true })} />
                    {errors.statusSistema && <span className="error-message">Campo Obrigatório</span>}
                  </Form.Group>              
              </Col>
            </Row>
            <div >
              <Button className="btn-salvar" type="submit" > Salvar </Button>
              <Button className="btn-editar" type="button" disable={!handleAdicionarConsulta} > Editar </Button>
              <Button className="btn-reset" type="reset" disable={!handleAdicionarConsulta} > Deletar </Button>
            </div>
          </form>
          {showSuccessAlert && (<div className="alert alert-success mt-3"> Consulta cadastrada com sucesso! </div> )}         
        </section>
      </Container>
    </>
  )
}

export default CadastroConsulta


