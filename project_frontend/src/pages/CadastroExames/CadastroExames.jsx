//BIBLIOTECAS
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
//CONTEXT
import { useAppContext } from "../../context/useAppContext";
//COMPONENTS
import Sidebar from "../../components/SidebarComponents/Sidebar"
//CSS
import "../../assets/index.css"

import { URL_API } from "../../services";


function CadastroExames() {
  const { handleAdicionarExame, pacientes, carregarPacientes } = useAppContext();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editar, setEditar] = useState(true);
  const [deletar, setDeletar] = useState(true);

  useEffect(() => {
    carregarPacientes();
  }, []);

  function createExame(exame) {
    const novoExame = {
      ...exame,
      pacienteId: Number(exame.pacienteId)
    }
    handleAdicionarExame(novoExame);
    setShowSuccessAlert(true);

    // Limpar o formulário
    reset();
    // Imprimir os dados no console
    console.log('Dados do Exame para o paciente:', exame);
  }

  const handleDeleteExame = async (e, ExameId) => {
    e.preventDefault();
    
    window.confirm("Tem certeza que deseja excluir o exame?") &&
      apiClient
        .delete(`/exame/${exameId}`)
        .then(() => {
          const novosExames = exames.filter((exame) => exame.id !== exameId);
          setDietas(novosExames);
          alert("Exame excluído com sucesso!");
        })
        .catch((erro) => console.error(erro));
  };

  
  const handleEditarExame = async (e) => {
    e.preventDefault();

    window.confirm("Tem certeza que deseja editar exame?") &&
      apiClient
        .put(`/exames/${id}`, exames)
        .then(() => {
          window.alert("Exame editado com sucesso!");
          navigate("/");
        })
        .catch((erro) => console.error(erro));
  };

  const handlePaciente = async (e, paciente, exames) => {
    e.preventDefault();

    const novosExames = exames.filter((exame) => exame.pacienteId == paciente.Id);
    if(novosExames == null || novosExames.length == 0 ) {
      setEditar(true);
      setDeletar(true);
      }
    else {
      exames = novosExames[0];
      setEditar(false);
      setDeletar(false);
    }
  }


  return (
    <>
      <Sidebar />
      <Container >
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
              </Col>
              <Col>
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
            </Row>
            <Row>
              <Col>
                <Form.Group name="Tipo">
                  <Form.Label>Tipo de Exame:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o tipo de exame"
                    {...register("tipo", {
                      required: true,
                      minLength: 4,
                      maxLength: 32,
                    })}
                  />
                  {errors.tipo && (
                    <span className="error-message">Campo Obrigatório com 4 a 32 caracteres</span>
                  )}
                </Form.Group>
              </Col>
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


            <Form.Group name="Resultado">
              <Form.Label>Resultado do Exame:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Digite o resultado do exame"
                {...register("resultados", {
                  required: true, minLength: 16,
                  maxLength: 1024,
                })}
              />
              {errors.resultados && (
                <span className="error-message">Campo Obrigatório com 16 a 1024 caracteres</span>
              )}
            </Form.Group>
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
                <Form.Group name="Laboratorio">
                  <Form.Label>Laboratório:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite nome do laboratório"
                    {...register("laboratorio", {
                      required: true, minLength: 4,
                      maxLength: 32
                    })}
                  />
                  {errors.laboratorio && (
                    <span className="error-message">Campo Obrigatório com 4 a 32 caracteres</span>
                  )}
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
            <div >
              <Button className="btn-salvar" type="submit" > Salvar </Button>
            </div>
            <div>
              <Button disabled={deletar} onClick={(e) => handleDeleteExame(e, exames.id)}>
                Excluir
              </Button>
              <Button disabled={editar} onClick={(e) => handleEditarExame(e)}>
                Editar
              </Button>
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