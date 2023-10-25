import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../context/useAppContext";
import Sidebar from "../../components/SidebarComponents/Sidebar";

function CadastroDieta() {
  const { handleAdicionarDieta, pacientes, carregarPacientes } = useAppContext();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    carregarPacientes();
  }, []);

  function createDieta(dieta) {
    const novaDieta = {
      ...dieta,
      pacienteId: Number(dieta.pacienteId),
    };
    handleAdicionarDieta(novaDieta);
    setShowSuccessAlert(true);

    // Limpar o formulário
    reset();
    // Imprimir os dados no console
    console.log('Dados da Dieta para o paciente:', dieta);
  }

  return (
    <div>
      <Sidebar />
      <Container>
        <section className="form-med">
          <form onSubmit={handleSubmit(createDieta)}>
            <h2>Cadastro Dietas</h2>
            <Row>
              <Col>
                <Form.Group controlId="pacienteId">
                  <Form.Label>Selecione o paciente:</Form.Label>
                  <Form.Select
                    {...register("pacienteId", { required: true })}
                  >
                    {pacientes.map((paciente) => (
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
                <Form.Group controlId="dieta">
                  <Form.Label>Nome da dieta:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome da dieta"
                    {...register("dieta", {
                      required: true,
                      minLength: 5,
                      maxLength: 100,
                    })}
                  />
                  {errors.dieta && (
                    <span className="error-message">Campo Obrigatório  de 5 a 100 caracteres</span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group name="horario">
                  <Form.Label>Horário:</Form.Label>
                  <Form.Control type="time" defaultValue={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {...register("horario", { required: true })} />
                  {errors.horario && <span className="error-message">Campo Obrigatório</span>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group name="data">
                  <Form.Label>Data:</Form.Label>
                  <Form.Control type="date" {...register("data", { required: true })} />
                  {errors.data && <span className="error-message">Campo Obrigatório</span>}
                </Form.Group>
              </Col>
              <Col>
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
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group name="descricao">
                  <Form.Label>Descrição:</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Descrição" {...register("descricao", { required: true, minLength: 10, maxLength: 1000 })} />
                  {errors.descricao && <span className="error-message">Campo Obrigatório  de 10 a 1000 caracteres</span>}
                </Form.Group>
              </Col>
            </Row>
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

            <div>
              <Button className="btn-salvar" type="submit">
                Salvar
              </Button>
            </div>
          </form>

          {showSuccessAlert && (
            <div className="alert alert-success mt-3">
              Dieta cadastrada com sucesso!
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}

export default CadastroDieta;
