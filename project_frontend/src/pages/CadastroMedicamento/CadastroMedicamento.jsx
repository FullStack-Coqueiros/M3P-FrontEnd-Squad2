import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, FormGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from "../../context/useAppContext";
import Sidebar from "../../components/SidebarComponents/Sidebar"
import { URL_API } from "../../services";


function CadastroMedicamentos() {
    const { handleAdicionarMedicamento, handleDeletarMedicamento, pacientes, setPacientes, carregarPacientes } = useAppContext();
    const [isSaved, setIsSaved] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        
        carregarPacientes();
    }, []);

    function createMedicamento(medicamento) {

        const novoMedicamento = {
            ...medicamento, 
            pacienteId: Number(medicamento.pacienteId)
        
        }
        

        handleAdicionarMedicamento(novoMedicamento);
        setIsSaved(true);
        setShowSuccessAlert(true);

        // Limpar o formulário
        reset();
        // Imprimir os dados no console
        console.log('Dados do medicamento para o paciente:', medicamento);

        
    }
    
    const deletarMedicamento = (medicamentoId) => {

        const medicamentoParaDeletar = medicamentos.find((medicamento) => medicamento.id === medicamentoId);

        if (medicamentoParaDeletar) {
            handleDeletarMedicamento(medicamentoId);
        } else {
            console.warn('Tentativa de deletar medicamento inexistente.');
        }
    };

    return (
        <>
            <Sidebar />
            <Container>


                <h1>INFORME OS CAMPOS PARA CADASTRO</h1>
                <section className="form-med">
                    <form onSubmit={handleSubmit(createMedicamento)}>
                        <h2>Cadastro Medicamentos</h2>
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

                                <Form.Group name="medicamento">
                                    <Form.Label>Nome do Medicamento:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite o nome do medicamento"
                                        {...register("medicamento", { required: true })}
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
                                        <option>Cápsula</option>
                                        <option>Comprimido</option>
                                        <option>Líquido</option>
                                        <option>Creme</option>
                                        <option>Gel</option>
                                        <option>Inalação</option>
                                        <option>Injeção</option>
                                        <option>Spray</option>
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
                                <Form.Group name="Unidade">
                                    <Form.Label>Unidade:</Form.Label>
                                    <Form.Select {...register("unidade", { required: true })} >
                                        <option>Selecione</option>
                                        <option>Mg</option>
                                        <option>Mgc</option>
                                        <option>G</option>
                                        <option>Ml</option>
                                        <option>%</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group name="observações">
                                    <Form.Label>Observações:</Form.Label>
                                    <Form.Control as="textarea" rows={5} placeholder="Observações" {...register("observações", { required: true, minLength: 10, maxLength: 1000 })} />
                                    {errors.observacoes && <span className="error-message">Campo Obrigatório</span>}
                                </Form.Group>

                                <Form.Group name="statusSistema">
                                    <Form.Label>Status do sistema:</Form.Label>
                                    <Form.Control type="isValid" placeholder="Status do sistema" {...register("statusSistema", { required: true })} />
                                    {errors.statusSistema && <span className="error-message">Campo Obrigatório</span>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <div >
                            <Button className="btn-salvar" type="submit" > Salvar </Button>
                            {/* <Button className="btn-editar" type="button" disable={!handleAdicionarDieta} > Editar </Button>
                            <Button className="btn-reset" type="reset" disable={!handleAdicionarDieta} > Deletar </Button> */}
                        </div>
                    </form>

                    {showSuccessAlert && (<div className="alert alert-success mt-3"> Dieta cadastrada com sucesso!
                    </div>
                    )}
                </section>


            </Container>
        </>

    );
}


export default CadastroMedicamentos;