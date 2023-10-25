import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";

import { useAppContext } from "../../context/useAppContext";
import Sidebar from "../../components/SidebarComponents/Sidebar";

function CadastroPaciente() {
  const { handleAdicionarPaciente } = useAppContext();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const {
    register,
    setValue,
    setFocus,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const checkCEP = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setValue("logradouro", data.logradouro);
      setValue("bairro", data.bairro);
      setValue("localidade", data.localidade);
      setValue("uf", data.uf);
      setFocus("numero", "");
    } catch (error) {
      console.error("Erro ao obter dados do CEP:", error);
    }
  };

  const createPaciente = (paciente) => {
    try {
      const novoPaciente = {
        ...paciente,
        pacienteId: Number(paciente.pacienteId),
      };
      console.log('Novo Paciente:', novoPaciente);

      // Adicionei um console.log aqui para verificar os dados antes de salvar
      console.log('Dados do paciente antes de salvar:', paciente);

      handleAdicionarPaciente(novoPaciente);
      setShowSuccessAlert(true);

      // Limpar o formulário
      reset();
      // Imprimir os dados no console
      console.log('Dados do paciente após salvar:', paciente);
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <Container>
        <section className="form-med">
          <div className="container mt-5">
            <h2>Cadastro de Pacientes</h2>
            <form onSubmit={handleSubmit(createPaciente)}>
              <div className="row mb-4">
                <div className="col-8">
                  <Form.Group controlId="nome">
                    <Form.Label className="mb-0">Nome Completo:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome completo"
                      {...register("nomeCompleto", {
                        required: true,
                        minLength: 8,
                        maxLength: 64,
                      })}
                    />
                    {errors.nome && (
                      <span className="error-message">Campo Obrigatório com 8 a 64 caracteres</span>
                    )}
                  </Form.Group>
                </div>

                <div className="col-2">
                  <Form.Group controlId="genero">
                    <Form.Label className="mb-0">Gênero</Form.Label>
                    <Form.Select {...register("genero", { required: true })}>
                      <option>Selecione</option>
                      <option>Feminino</option>
                      <option>Masculino</option>
                      <option>Outro</option>
                    </Form.Select>
                    {errors.genero && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>
                <div className="col-2">
                  <Form.Group controlId="dataNascimento">
                    <Form.Label className="mb-0">
                      Data de nascimento:
                    </Form.Label>
                    <Form.Control
                      type="date"
                      {...register("dataNascimento", { required: true })}
                    />
                    {errors.dataNascimento && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-4">
                  <Form.Group controlId="cpf">
                    <Form.Label className="mb-0">CPF</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="CPF"
                      {...register("cpf", {
                        required: true,
                        pattern: { value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ },
                      })}
                    />
                    {errors.cpf && (
                      <span className="error-message">Campo obrigatório com o formato 000.000.000-00</span>
                    )}
                  </Form.Group>
                </div>

                <div className="col-4">
                  <Form.Group controlId="rg">
                    <Form.Label className="mb-0">RG</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="RG"
                      {...register("rg", { required: true })}
                    />
                    {errors.rg && (
                      <span className="error-message">Campo Obrigatório com máximo de 20 caracteres</span>
                    )}
                  </Form.Group>
                </div>


                <div className="col-4">
                  <Form.Group controlId="estadoCivil">
                    <Form.Label className="mb-0">Estado civil</Form.Label>
                    <Form.Select
                      {...register("estadoCivil", { required: true })}
                    >
                      <option>Selecione</option>
                      <option>Casado</option>
                      <option>Solteiro</option>
                      <option>Divorciado</option>
                      <option>Viúvo</option>
                    </Form.Select>
                    {errors.estadoCivil && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <Form.Group controlId="telefone">
                    <Form.Label className="mb-0">Telefone:</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Telefone"
                      {...register("telefone", {
                        required: true,
                        pattern: {
                          value: /^\(\d{2}\)\s\d\s\d{4}-\d{4}$/,
                        },
                      })}
                    />
                    {errors.telefone && (
                      <span className="error-message">Campo Obrigatório com o formato (99) 9 9999-99999</span>
                    )}
                  </Form.Group>
                </div>

                <div className="col-6">
                  <Form.Group controlId="email">
                    <Form.Label className="mb-0">Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Digite seu email"
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="error-message">Campo Obrigatório exemplo@gmail.com</span>
                    )}
                  </Form.Group>
                </div>
              </div>

              <div className="row  mb-4">
                <div className="col-6">
                  <Form.Group controlId="naturalidade">
                    <Form.Label className="mb-0">Naturalidade:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Naturalidade"
                      {...register("naturalidade", {
                        required: true,
                        minLength: 8,
                        maxLength: 64,
                      })}
                    />
                    {errors.naturalidade && (
                      <span className="error-message">Campo Obrigatório com 8 a 64 caracteres</span>
                    )}
                  </Form.Group>
                </div>

                <div className="col-6">
                  <Form.Group controlId="contatoDeEmergencia">
                    <Form.Label className="mb-0">
                      Contato de emergência:
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Contato de emergência"
                      {...register("contatoDeEmergencia", {
                        required: true,
                        pattern: {
                          value: /^\(\d{2}\)\s\d\s\d{4}-\d{4}$/,
                        },
                      })}
                    />
                    {errors.contatoDeEmergencia && (
                      <span className="error-message">Campo Obrigatório com o formato (99) 9 9999-99999</span>
                    )}
                  </Form.Group>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <Form.Group controlId="alergias">
                    <Form.Label className="mb-0">Alergias</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Alergias"
                      {...register("alergias", {
                        required: false,
                      })}
                    />

                  </Form.Group>
                </div>

                <div className="col-6">
                  <Form.Group controlId="cuidadosEspecificos">
                    <Form.Label className="mb-0">
                      Cuidados específicos
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Cuidados específicos"
                      {...register("cuidadosEspecificos", {
                        required: false,
                      })}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-4">
                  <Form.Group controlId="convenio">
                    <Form.Label className="mb-0">Convênio:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Convênio"
                      {...register("convenio", {
                        required: false,
                      })}
                    />
                  </Form.Group>
                </div>

                <div className="col-4">
                  <Form.Group controlId="numeroDoConvenio">
                    <Form.Label className="mb-0">Número do convênio</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Número do convênio"
                      {...register("numeroDoConvenio", { required: false })}
                    />
                  </Form.Group>
                </div>

                <div className="col-4">
                  <Form.Group controlId="validadeDoConvenio">
                    <Form.Label className="mb-0">
                      Validade do convênio:
                    </Form.Label>
                    <Form.Control
                      type="date"
                      {...register("validadeDoConvenio", { required: false })}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-4">
                  <Form.Group controlId="cep">
                    <Form.Label className="mb-0">Cep</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="00000-000"
                      {...register("cep", { required: true })}
                      onBlur={checkCEP}
                    />
                    {errors.cep && <span>Campo Obrigatório</span>}
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group controlId="localidade">
                    <Form.Label className="mb-0">Cidade</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cidade"
                      {...register("localidade", { required: true })}
                    />
                    {errors.localidade && <span>Campo Obrigatório</span>}
                  </Form.Group>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <Form.Group controlId="uf">
                    <Form.Label className="mb-0">Estado</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Estado"
                      {...register("uf", { required: true })}
                    />
                    {errors.uf && <span>Campo Obrigatório</span>}
                  </Form.Group>
                </div>

                <div className="col-6">
                  <Form.Group controlId="logradouro">
                    <Form.Label className="mb-0">Logradouro</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Rua"
                      {...register("logradouro", { required: true })}
                    />
                    {errors.logradouro && <span>Campo Obrigatório</span>}
                  </Form.Group>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <Form.Group controlId="numero">
                    <Form.Label className="mb-0">Número</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Número"
                      {...register("numero", { required: true })}
                    />
                    {errors.numero && <span>Campo Obrigatório</span>}
                  </Form.Group>
                </div>

                <div className="col-6">
                  <Form.Group controlId="complemento">
                    <Form.Label className="mb-0">Complemento</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Complemento"
                      {...register("complemento")}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <Form.Group controlId="bairro">
                    <Form.Label className="mb-0">Bairro</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Bairro"
                      {...register("bairro", { required: true })}
                    />
                    {errors.bairro && <span>Campo Obrigatório</span>}
                  </Form.Group>
                </div>

                <div className="col-6">
                  <Form.Group controlId="pontoDeReferencia">
                    <Form.Label className="mb-0">
                      Ponto de referência
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ponto de referência"
                      {...register("pontoDeReferencia")}
                    />
                  </Form.Group>
                </div>
              </div>
            
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

              <div>
                <Button className="btn-salvar" type="submit">
                  Salvar
                </Button>
              </div>
            </form>

            {showSuccessAlert && (
              <div className="alert alert-success mt-3">
                Cadastro efetuado com sucesso!
              </div>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}

export default CadastroPaciente;