import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import Sidebar from "../../components/SidebarComponents/Sidebar";

function CadastroPaciente() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const AdicionarPaciente = async (event) => {
    // setLoading(true);
    setTimeout(async () => {
      // await Post("pacientes", novoPaciente);
      // setLoading(false);
    }, 4000);
  };

  //API CEP
  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("logradouro", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("localidade", data.localidade);
        setValue("uf", data.uf);
        setFocus("número", "");
      });
  };

  return (
    <div>
      <Sidebar />
      <Container>
        <h1>INFORME OS CAMPOS PARA CADASTRAR PACIENTE</h1>
        <section className="form-med">
          <div className="container mt-5">
            {/* <form onSubmit={handleAdicionarPaciente(onSubmit)}> */}
            <form onSubmit={handleSubmit(AdicionarPaciente)}>
              <div className="row mb-4">
                <div className="col-8">
                  <Form.Group name="nome">
                    <Form.Label className="mb-0">Nome Completo:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome completo"
                      {...register("nome", {
                        required: true,
                        minLength: 8,
                        maxLength: 64,
                      })}
                    />
                    {errors.nome && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>

                <div className="col-2">
                  <Form.Group name="genero">
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
                  <Form.Group name="dataNascimento">
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
                  <Form.Group name="cpf">
                    <Form.Label className="mb-0">CPF</Form.Label>
                    <Form.Control
                      type=""
                      placeholder="CPF"
                      {...register("cpf", {
                        required: true,
                        pattern: { value: /^(\d{3}\.){3}\d{3}\-\d{2}$/ },
                      })}
                    />
                    {errors.cpf && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>

                <div className="col-4">
                  <Form.Group name="rg">
                    <Form.Label className="mb-0">RG</Form.Label>
                    <Form.Control
                      type=""
                      placeholder="RG"
                      {...register("rg", {
                        required: true,
                        pattern: { value: /^\d{4}\.\d{3}-[A-Z]{13}$/ },
                      })}
                    />
                    {errors.rg && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>

                <div className="col-4">
                  <Form.Group name="estadoCivil">
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
                  <Form.Group name="telefone">
                    <Form.Label className="mb-0">Telefone:</Form.Label>
                    <Form.Control
                      type=""
                      placeholder="Telefone"
                      {...register("telefone", {
                        required: true,
                        pattern: {
                          value: /^\(\d{2}\)\s\d{1}\s\d{4}\s-\s\d{4}/g,
                        },
                      })}
                    />
                    {errors.telefone && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>

                <div className="col-6">
                  <Form.Group name="email">
                    <Form.Label className="mb-0">Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Digite seu email"
                      {...register("Email", {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>
              </div>

              <div className="row  mb-4">
                <div className="col-6">
                  <Form.Group name="naturalidade">
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
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>

                <div className="col-6">
                  <Form.Group name="contatoDeEmergencia">
                    <Form.Label className="mb-0">
                      Contato de emergência:
                    </Form.Label>
                    <Form.Control
                      type=""
                      placeholder="Contato de emergência"
                      {...register("contatoDeEmergencia", {
                        required: true,
                        pattern: {
                          value: /^\(\d{2}\)\s\d{1}\s\d{4}\s-\s\d{4}/g,
                        },
                      })}
                    />
                    {errors.contatoDeEmergencia && (
                      <span className="error-message">Campo Obrigatório</span>
                    )}
                  </Form.Group>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <Form.Group name="alergias">
                    <Form.Label className="mb-0">Alergias</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Alergias"
                      {...register("alergias", {
                        required: false,
                        minLength: 10,
                        maxLength: 1000,
                      })}
                    />
                  </Form.Group>
                </div>

                <div className="col-6">
                  <Form.Group name="cuidadosEspecificos">
                    <Form.Label className="mb-0">
                      Cuidados específicos
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Cuidados específicos"
                      {...register("cuidadosEspecificos", {
                        required: false,
                        minLength: 10,
                        maxLength: 1000,
                      })}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-4">
                  <Form.Group name="convenio">
                    <Form.Label className="mb-0">Convênio:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Convênio"
                      {...register("convenio", {
                        required: false,
                        minLength: 8,
                        maxLength: 64,
                      })}
                    />
                  </Form.Group>
                </div>

                <div className="col-4">
                  <Form.Group name="numeroDoConvenio">
                    <Form.Label className="mb-0">Número do convênio</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Número do convênio"
                      {...register("numeroDoConvenio", { required: false })}
                    />
                  </Form.Group>
                </div>

                <div className="col-4">
                  <Form.Group name="validadeDoConvenio">
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
                  <Form.Group controlId="Cep">
                    <Form.Label className="mb-0">Cep</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="00000-000"
                      {...register("cep", { required: true })}
                      onBlur={checkCEP}
                    />
                    {errors.cep && <span>Campo Obrigatório</span>}
                  </Form.Group>
                </div>

                <div className="col-2">
                  <Form.Control className=" mt-4" type="button"></Form.Control>
                </div>

                <div className="col-6">
                  <Form.Group controlId="Cidade">
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
                  <Form.Group controlId="Estado">
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
                  <Form.Group controlId="Logradouro">
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
                  <Form.Group controlId="número">
                    <Form.Label className="mb-0">Número</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Número"
                      {...register("número", { required: true })}
                    />
                    {errors.número && <span>Campo Obrigatório</span>}
                  </Form.Group>
                </div>

                <div className="col-6">
                  <Form.Group controlId="Complemento">
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
                  <Form.Group controlId="Bairro">
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
                  <Form.Group controlId="PontoDeReferencia">
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

              <div>
                <Button className="btn-salvar" type="submit">
                  {" "}
                  Salvar{" "}
                </Button>
              </div>
            </form>

            {/* {showSuccessAlert && (
            <div className="alert alert-success mt-3">
              {" "}
              Usuário cadastrado com sucesso!{" "}
            </div>
          )} */}
          </div>
        </section>
      </Container>
    </div>
  );
}

export default CadastroPaciente;