import React, { createContext, useEffect, useState } from 'react';
import { URL_API } from '../services';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [dietas, setDietas] = useState([]);
  const [exames, setExames] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [exercicios, setExercicios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

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

  const carregarUsuario = async () => {
    try {
      const usuariosResposta = await fetch(`${URL_API}/usuarios`);

        const usuariosData = await usuariosResposta.json();

        setUsuarios(usuariosData);
    } catch (error) {
        console.error('Erro ao carregar usuarios:', error);
    }
  }

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


  const adicionarDieta = async (novaDieta) => {
    try {
      const response = await fetch(`${URL_API}/dietas`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(novaDieta),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar a dieta .');
      }

      } catch (error) {
      console.error('Erro ao adicionar dieta:', error);
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

  const adicionarUsuario = async (novoUsuario) => {
    try {
      const resposta = await fetch(`${URL_API}/usuarios`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(novoUsuario),
      });

      if (!resposta.ok) {
        throw new Error('Erro ao salvar usuário .');
      }

      setUsuarios([...usuarios, { ...novoUsuario,}]);

      } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
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
    
      const examesData = await examesResponse.json();

      setExames(examesData);
    } catch (error) {
      console.error('Erro ao carregar exames:', error);
    }
  };

  const carregarConsultas = async () => {
    try {
      const consultasResponse = await fetch(`${URL_API}/consultas`);
    
      const consultasData = await consultasResponse.json();
      
      setConsultas(consultasData);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  const carregarDietas = async () => {
    try {
      const dietasResponse = await fetch(`${URL_API}/dietas`);
    
      const dietasData = await dietasResponse.json();
      
      setDietas(dietasData);
    } catch (error) {
      console.error('Erro ao carregar dietas:', error);
    }
  };
  
  const carregarMedicamentos = async () => {
    try {
      const medicamentosResponse = await fetch(`${URL_API}/medicamentos`);
    
      const medicamentosData = await medicamentosResponse.json();
      
      setMedicamentos(medicamentosData);
    } catch (error) {
      console.error('Erro ao carregar medicamentos:', error);
    }
  };

  const carregarExercicios = async () => {
    try {
      const exerciciosResponse = await fetch(`${URL_API}/exercicios`);
    
      const exerciciosData = await exerciciosResponse.json();
      
      setExercicios(exerciciosData);
    } catch (error) {
      console.error('Erro ao carregar exercicios:', error);
    }
  };
  
return (
  <AppContext.Provider
    value={{
      usuarios,
      pacientes,
      consultas,
      exames,
      dietas,
      medicamentos,
      exercicios,
      setUsuarios,
      setPacientes,
      setConsultas,
      setExames,
      setDietas,
      setMedicamentos,
      setExercicios,
      handleAdicionarPaciente: adicionarPaciente,
      handleAdicionarExame: adicionarExame,
      handleAdicionarMedicamento: adicionarMedicamento,
      handleAdicionarConsulta: adicionarConsulta,
      handleAdicionarExercicio: adicionarExercicio,
      handleAdicionarUsuario: adicionarUsuario,
      handleAdicionarDieta: adicionarDieta,
      carregarPacientes,
      carregarConsultas,
      carregarExames,
      carregarDietas,
      carregarMedicamentos,
      carregarUsuario,
      carregarExercicios
    }}
  >
    {children}
  </AppContext.Provider>
);
};

export default AppProvider;