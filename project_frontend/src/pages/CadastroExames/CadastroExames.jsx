import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from "../../context/useAppContext";
import Sidebar from "../../components/SidebarComponents/Sidebar"
import "./styles.css"

function CadastroExames() {
  const { handleAdicionarExame, handleDeletarExame, pacientes, setPacientes, carregarPacientes } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch('http://localhost:3000/pacientes');
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error('Erro ao buscar pacientes', error);
      }
    };
    fetchPacientes();
  }, [setPacientes]);

  function createExame(data) {
    const exame = {
      ...data,
      id: uuidv4(),
    };

    handleAdicionarExame(exame);
    setIsSaved(true);
    setShowSuccessAlert(true);

    // Limpar o formulário
    reset();
    // Imprimir os dados no console
    console.log('Dados do exame para o paciente:', exame);

    const deletarExame = (exameId) => {

      const exameParaDeletar = exames.find((exame) => exame.id === exameId);

      if (exameParaDeletar) {
        handleDeletarExame(exameId);
      } else {
        console.warn('Tentativa de deletar exame inexistente.');
      }
    };

  }


  return (
    <>
      <Sidebar />
      <Container>


        <h1>INFORME OS CAMPOS PARA CADASTRO</h1>
        <section className="form-med">
          <form onSubmit={handleSubmit(createExame)}>
            <h2>Cadastro Exames</h2>
            <Row>
              <Col>
                <div className="form-section">
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
                </div>

                <Form.Group name="exame">
                  <Form.Label>Nome do Exame:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do exame"
                    {...register("exame", {
                      required: true,
                      minLength: 8,
                      maxLength: 64,
                    })}
                  />
                  {errors.exame && (
                    <span className="error-message">Campo Obrigatório com 8 a 64 caracteres</span>
                  )}
                </Form.Group>

              </Col>
              <Col>
                <Form.Group name="Tipo">
                  <Form.Label>Tipo de Exame:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o tipo de exame"
                    {...register("tipo", { required: true })}
                  />
                  {errors.tipo && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group name="DataExame">
                  <Form.Label>Data do Exame:</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("dataExame", { required: true })}
                  />
                  {errors.dataExame && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group name="HoraExame">
                  <Form.Label>Hora do Exame:</Form.Label>
                  <Form.Control
                    type="time"

                    {...register("horaExame", { required: true })}
                  />
                  {errors.horaExame && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>

              <Col>
                <Form.Group name="Documento">
                  <Form.Label>URL do Documento:</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Digite a URL do documento"
                    {...register("documento")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group name="Resultados">
                  <Form.Label>Laboratório:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite ou carregue os resultados"
                    {...register("resultados", { required: true })}
                  />
                  {errors.resultados && (
                    <span className="error-message">Campo Obrigatório</span>
                  )}
                </Form.Group>
                <Form.Group name="statusSistema">
                  <Form.Check
                    type="checkbox"
                    label="Status do Sistema"
                    {...register("statusSistema", { required: true })}
                  />
                </Form.Group>

              </Col>
            </Row>

            <div >
              <Button className="btn-salvar" type="submit" > Salvar </Button>
              {/* <Button className="btn-editar" type="button" disable={!handleAdicionarExame} > Editar </Button>
        <Button className="btn-reset" type="reset" disabled={!handleDeletarExame}>Deletar</Button> */}



            </div>
          </form>

          {showSuccessAlert && (
            <div className="alert alert-success mt-3">
              Cadastro efetuado com sucesso!
            </div>
          )}
        </section>
      </Container>

    </>
  );
}

export default CadastroExames;