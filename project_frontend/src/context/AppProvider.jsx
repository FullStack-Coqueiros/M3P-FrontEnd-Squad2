import React, { createContext, useEffect, useState } from 'react';
import { URL_API } from '../services';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [exames, setExames] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [exercicios, setExercicios] = useState([]);

  const adicionarExame = async (novoExame) => {
    try {
      const response = await fetch(`${URL_API}/exames`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoExame),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o exame no servidor.');
      }

      setExames([...exames, { ...novoExame,}]);
    } catch (error) {
      console.error('Erro ao adicionar exame:', error);
    }
  };

  const carregarPacientes = async () => {
    try {
      const pacientesResponse = await fetch(`${URL_API}/pacientes`);

        const pacientesData = await pacientesResponse.json();

        setPacientes(pacientesData);
    } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
    }
  }

  const carregarExames = async () => {
    try {
      const examesResponse = await fetch(`${URL_API}/exames`);
    
      if (!examesResponse.ok) {
        throw new Error('Erro ao carregar dados da API');
      }
    
      const examesData = await examesResponse.json();
      setExames(examesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const adicionarMedicamento = async (novoMedicamento) => {
    try {
      const response = await fetch(`${URL_API}/medicamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoMedicamento),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o medicamento .');
      }

      } catch (error) {
      console.error('Erro ao adicionar medicamento:', error);
    }
  };

  const adicionarConsulta = async (novaConsulta) => {
    try {
      const response = await fetch(`${URL_API}/consultas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaConsulta),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar a consulta .');
      }

      } catch (error) {
      console.error('Erro ao adicionar consulta:', error);
    }
  };

  const adicionarPaciente = async (novoPaciente) => {
    try {
      const response = await fetch(`${URL_API}/pacientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoPaciente),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar paciente.');
      }

      } catch (error) {
      console.error('Erro ao adicionar consulta:', error);
    }
  };

  const adicionarExercicio = async (novoExercicio) => {
    try {
      const response = await fetch(`${URL_API}/exercicios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoExercicio),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o exercício no servidor.');
      }

      } catch (error) {
      console.error('Erro ao adicionar exercício:', error);
    }
  };
  
  
return (
  <AppContext.Provider
    value={{
      exames,
      pacientes,
      setPacientes,
      handleAdicionarPaciente: adicionarPaciente,
      handleAdicionarExame: adicionarExame,
      handleAdicionarMedicamento: adicionarMedicamento,
      handleAdicionarConsulta: adicionarConsulta,
      handleAdicionarExercicio: adicionarExercicio,
      carregarPacientes,
      carregarExames
    }}
  >
    {children}
  </AppContext.Provider>
);
};

export default AppProvider;