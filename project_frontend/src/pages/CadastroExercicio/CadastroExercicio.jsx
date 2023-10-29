import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, FormGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../context/useAppContext";
import Sidebar from "../../components/SidebarComponents/Sidebar"
import { URL_API } from "../../services";


function CadastroExercicios() {
  const { handleAdicionarExercicio, handleDeletarExercicio, pacientes, setPacientes, carregarPacientes } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [editar, setEditar] = useState(true);
  const [deletar, setDeletar] = useState(true);

  useEffect(() => {
      
      carregarPacientes();
  }, []);

  function createExercicio(exercicio) {
      const novoExercicio = {
          ...exercicio, 
          pacienteId: Number(exercicio.pacienteId)      
      }  

      handleAdicionarExercicio(novoExercicio);
      setIsSaved(true);
      setShowSuccessAlert(true);
      
      reset();
      
      console.log('Dados do exercício para o paciente:', exercicio);      
  }
  
  const handleDeleteExercicio = async (e, exercicioId) => {
    e.preventDefault();
    
    window.confirm("Tem certeza que deseja excluir o exercicio?") &&
      apiClient
        .delete(`/exercicio/${exercicioId}`)
        .then(() => {
          const novosExercicios = exercicios.filter((exercicio) => exercicio.id !== exercicioId);
          setDietas(novosExercicios);
          alert("Exercicio excluído com sucesso!");
        })
        .catch((erro) => console.error(erro));
  };

  
  const handleEditarExercicio = async (e) => {
    e.preventDefault();

    window.confirm("Tem certeza que deseja editar exercicio?") &&
      apiClient
        .put(`/exercicios/${id}`, exercicios)
        .then(() => {
          window.alert("Exercicio editado com sucesso!");
          navigate("/");
        })
        .catch((erro) => console.error(erro));
  };

  const handlePaciente = async (e, paciente, exercicios) => {
    e.preventDefault();

    const novosExercicios = exercicios.filter((exercicio) => exercicio.pacienteId == paciente.Id);
    if(novosExercicios == null || novosExercicios.length == 0 ) {
      setEditar(true);
      setDeletar(true);
      }
    else {
      exercicios = novosExercicios[0];
      setEditar(false);
      setDeletar(false);
    }
  }

  return (
      <>
          <Sidebar />
          <Container>


              <h1>INFORME OS CAMPOS PARA CADASTRO</h1>
              <section className="form-med">
                  <form onSubmit={handleSubmit(createExercicio)}>
                      <h2>Cadastro de Exercícios</h2>
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

                              <Form.Group name="exercício">
                                  <Form.Label>Nome da Série de Exercícios:</Form.Label>
                                  <Form.Control
                                      type="text"
                                      placeholder="Digite o nome do exercício"
                                      {...register("medicamento", { required: true, minLength: 5, maxLength: 100 })}
                                  />
                                  {errors.medicamento && (
                                      <span className="error-message">Campo Obrigatório</span>
                                  )}
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
                          </Col>
                          <Col>
                              <Form.Group name="tipo">
                                  <Form.Label>Tipo:</Form.Label>
                                  <Form.Select {...register("tipo", { required: true })} >
                                      <option>Selecione</option>
                                      <option>Resistência Aeróbica</option>
                                      <option>Resistência Muscular</option>
                                      <option>Flexibilidade</option>
                                      <option>Força</option>
                                      <option>Agilidade</option>
                                      <option>Outro</option>
                                      
                                  </Form.Select>
                                  {errors.tipo && <span className="error-message">Campo Obrigatório</span>}
                              </Form.Group>
                              <Form.Group name="quantidade">
                                  <Form.Label>Quantidade:</Form.Label>
                                  <Form.Control type="number" step="0.01" min="0"
                                      defaultValue="0.00"
                                      {...register("quantidade", { required: true, pattern: /^\d+(\.\d{2})?$/ })}
                                      isInvalid={!!errors.quantidade} />
                                  {errors.quantidade && <Form.Control.Feedback type="invalid">A quantidade deve ter no mínimo duas casas após a vírgula.</Form.Control.Feedback>}
                              </Form.Group>
                          </Col>
                      </Row>

                      
                      <Row>
                          <Col>
                              <Form.Group name="descrição">
                                  <Form.Label>Descrição:</Form.Label>
                                  <Form.Control as="textarea" rows={5} placeholder="Descrição" {...register("descrição", { required: true, minLength: 10, maxLength: 1000 })} />
                                  {errors.observacoes && <span className="error-message">Campo Obrigatório</span>}
                              </Form.Group>

                              
                          </Col>
                      </Row>
                      <div >
                          <Button className="btn-salvar" type="submit" > Salvar </Button>                     
                      </div>

                      <div>
                        <Button disabled={deletar} onClick={(e) => handleDeleteExercicio(e, exercicios.id)}>
                            Excluir
                        </Button>
                        <Button disabled={editar} onClick={(e) => handleEditarExercicio(e)}>
                            Editar
                        </Button>
                    </div>

                  </form>

                  {showSuccessAlert && (<div className="alert alert-success mt-3"> Exercício cadastrado com sucesso!
                  </div>
                  )}
              </section>


          </Container>
      </>

  );
}


export default CadastroExercicios;
