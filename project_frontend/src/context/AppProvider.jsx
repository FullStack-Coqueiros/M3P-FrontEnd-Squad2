import React, { createContext, useEffect, useState } from 'react';
import { URL_API } from '../services';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [exames, setExames] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);

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

  const deletarExame = (exameId) => {
    // Filtra os exames para remover o exame com o ID correspondente
    const novosExames = exames.filter((exame) => exame.id !== exameId);
    setExames(novosExames);
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
        throw new Error('Erro ao salvar o medicamento no servidor.');
      }

      } catch (error) {
      console.error('Erro ao adicionar medicamento:', error);
    }
  };
  
  
return (
  <AppContext.Provider
    value={{
      exames,
      pacientes,
      setPacientes,
      handleAdicionarExame: adicionarExame,
      handleDeletarExame: deletarExame,
      handleAdicionarMedicamento: adicionarMedicamento,
      carregarPacientes,
      carregarExames
    }}
  >
    {children}
  </AppContext.Provider>
);
};

export default AppProvider;