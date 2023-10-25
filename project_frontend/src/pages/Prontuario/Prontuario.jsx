import React, { useEffect } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { useParams } from 'react-router-dom';

function Prontuario() {
  const { pacientes, consultas, exames, medicamentos, dietas, exercicios, carregarPacientes } = useAppContext();
  const { id } = useParams();
  const pacienteIdClicado = parseInt(id, 10);

  useEffect(() => {
    async function fetchData() {
      await carregarPacientes();
    }

    fetchData();
  }, [carregarPacientes]);

  const pacienteClicado = pacientes.find((paciente) => paciente.id === pacienteIdClicado);

  if (!pacienteClicado) {
    return <div>Paciente não encontrado</div>;
  }

  return (
    <div>
      <h2>Prontuário do Paciente - {pacienteClicado.nomeCompleto}</h2>

      <div>
        <h3>Informações Básicas</h3>
        <p>Nome do Paciente: {pacienteClicado.nomeCompleto}</p>
        <p>Convênio: {pacienteClicado.convenio}</p>
        <p>Contato de Emergência: {pacienteClicado.contatoEmergencia}</p>
        <p>Lista de Alergias: {pacienteClicado.alergias?.join(', ')}</p>
        <p>Lista de Cuidados Específicos: {pacienteClicado.cuidadosEspecificos?.join(', ')}</p>
      </div>

      {consultas && consultas.length > 0 && (
        <div>
          <h3>Histórico de Consultas</h3>
          <ul>
            {consultas
              .filter((consulta) => consulta.pacienteId === pacienteClicado.id)
              .map((consulta) => (
                <li key={consulta.id}>
                  {consulta.dataConsulta} - {consulta.descricao}
                </li>
              ))}
          </ul>
        </div>
      )}

      {exames && exames.length > 0 && (
        <div>
          <h3>Histórico de Exames</h3>
          <ul>
            {exames
              .filter((exame) => exame.pacienteId === pacienteClicado.id)
              .map((exame) => (
                <li key={exame.id}>
                  {exame.dataExame} - {exame.tipo}
                </li>
              ))}
          </ul>
        </div>
      )}

      {medicamentos && medicamentos.length > 0 && (
        <div>
          <h3>Histórico de Medicamentos</h3>
          <ul>
            {medicamentos
              .filter((medicamento) => medicamento.pacienteId === pacienteClicado.id)
              .map((medicamento) => (
                <li key={medicamento.id}>
                  {medicamento.data} - {medicamento.medicamento}
                </li>
              ))}
          </ul>
        </div>
      )}

      {dietas && dietas.length > 0 && (
        <div>
          <h3>Histórico de Dietas</h3>
          <ul>
            {dietas
              .filter((dieta) => dieta.pacienteId === pacienteClicado.id)
              .map((dieta) => (
                <li key={dieta.id}>
                  {dieta.data} - {dieta.dieta}
                </li>
              ))}
          </ul>
        </div>
      )}

      {exercicios && exercicios.length > 0 && (
        <div>
          <h3>Histórico de Exercícios</h3>
          <ul>
            {exercicios
              .filter((exercicio) => exercicio.pacienteId === pacienteClicado.id)
              .map((exercicio) => (
                <li key={exercicio.id}>
                  {exercicio.data} - {exercicio.nomeSerie}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Prontuario;