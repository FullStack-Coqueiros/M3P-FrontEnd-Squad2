import React from "react";

function CadastroPacientes() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await Post("pacientes", novoPaciente);
      setLoading(false);
    }, 4000);
  };

  return (
    <div>
      <>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="nome">Nome completo:</label>
                <input
                  required
                  autoFocus
                  type="text"
                  name="nome"
                  id="nome"
                  minLength={8}
                  maxLength={64}
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="genero">Gênero:</label>
                <select
                  required
                  name="genero"
                  id="genero"
                  value={novoPaciente.genero}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="data-nascimento">Data de nascimento:</label>
                <input
                  required
                  type="date"
                  name="dataDeNascimento"
                  id="dataDeNascimento"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="cpf">CPF:</label>
                <input
                  required
                  type="text"
                  minLength={11}
                  maxLength={11}
                  placeholder="000.000.000-00"
                  name="cpf"
                  id="cpf"
                  ref={(el) => (inputRefs.current.cpf = el)}
                />
                {errorCpf && <span>CPF já cadastrado no sistema.</span>}
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="rg">RG com órgão expeditor:</label>
                <input required type="text" name="rg" id="rg" maxLength={20} />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="estadoCivil">Estado civil:</label>
                <select required name="estadoCivil" id="estadoCivil">
                  <option value="">Selecione</option>
                  <option value="solteiro">Solteiro</option>
                  <option value="casado">Casado</option>
                  <option value="divorciado">Divorciado</option>
                  <option value="viuvo">Viúvo</option>
                </select>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="telefone">Telefone:</label>
                <input
                  required
                  type="text"
                  id="telefone"
                  name="telefone"
                  minLength={11}
                  maxLength={11}
                  placeholder="(xx) xxxxx-xxxx"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="email">Email</label>
                <input required type="email" name="email" id="email" />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="naturalidade">Naturalidade</label>
                <input
                  required
                  type="text"
                  minLength={8}
                  maxLength={64}
                  name="naturalidade"
                  id="naturalidade"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="contatoDeEmergencia">
                  Contato de emergência
                </label>
                <input
                  required
                  type="text"
                  minLength={11}
                  maxLength={11}
                  name="contatoDeEmergencia"
                  id="contatoDeEmergencia"
                  placeholder="(xx) xxxxx-xxxx"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="alergias">Alergias</label>
                <input type="text" name="alergias" id="alergias" />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="cuidadosEspecificos">
                  Cuidados específicos
                </label>
                <input
                  type="text"
                  name="cuidadosEspecificos"
                  id="cuidadosEspecificos"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="convenio">Convênio</label>
                <input type="text" name="convenio" id="convenio" />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="numeroDoConvenio">Número do convênio</label>
                <input
                  type="number"
                  name="numeroDoConvenio"
                  id="numeroDoConvenio"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="validadeDoConvenio">Validade do convênio</label>
                <input
                  type="date"
                  name="validadeDoConvenio"
                  id="validadeDoConvenio"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="cep">Cep</label>
                <input required type="text" name="cep" id="cep" maxLength={8} />
                <button>Buscar cep</button>
              </div>
              {errorCep && <span>Insira um cep válido</span>}
            </div>

            <div>
              <div>
                <label htmlFor="localidade">Cidade</label>
                <input disabled type="text" id="localidade" name="localidade" />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="uf">Estado</label>
                <input disabled type="text" id="uf" name="uf" />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="logradouro">Rua</label>
                <input
                  disabled
                  type="text"
                  id="logradouro"
                  name="logradouro"
                />{" "}
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="numero">Número</label>
                <input required type="text" id="numero" name="numero" />{" "}
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="complemento">Complemento</label>
                <input type="text" id="complemento" name="complemento" />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="bairro">Bairro</label>
                <input disabled type="text" id="bairro" name="bairro" />{" "}
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="pontoDeReferencia">Ponto de referência</label>
                <input
                  type="text"
                  id="pontoDeReferencia"
                  name="pontoDeReferencia"
                />
              </div>
            </div>

            <div>
              {loading ? (
                <button type="button" disabled="">
                  <span aria-hidden="true"></span>
                  <span role="status">Loading...</span>
                </button>
              ) : (
                <button type="submit">Salvar</button>
              )}
            </div>

            <button disabled>Excluir</button>
            <button disabled>Editar</button>
          </form>
        </div>
      </>
    </div>
  );
}

export default CadastroPacientes;
