function CadastroExercicios() {
  const { handleAdicionarMedicamento, handleDeletarExercicio, pacientes, setPacientes, carregarExercicios } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
  
  const deletarExercicio = (exercicioId) => {

      const exercicioParaDeletar = exercicios.find((exercicio) => exercicio.id === exercicioId);

      if (exercicioParaDeletar) {
          handleDeletarExercicio(exercicioId);
      } else {
          console.warn('Tentativa de deletar exercício inexistente.');
      }
  };

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
                          {/* <Button className="btn-editar" type="button" disable={!handleAdicionarExercicio} > Editar </Button>
                          <Button className="btn-reset" type="reset" disable={!handleAdicionarExercicio} > Deletar </Button> */}
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


export default CadastroMedicamentos;
