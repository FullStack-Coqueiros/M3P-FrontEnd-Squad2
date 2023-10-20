import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [exames, setExames] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const adicionarExame = async (novoExame) => {
    try {
      const response = await fetch('http://localhost:3000/exames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoExame),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o exame no servidor.');
      }

      setExames([...exames, { ...novoExame, id: uuidv4() }]);
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
      const pacientesResponse = await fetch('http://localhost:3000/pacientes');

        const pacientesData = await pacientesResponse.json();

        setPacientes(pacientesData);
    } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
    }
  }

  const fetchData = async () => {
    try {
      const examesResponse = await fetch('http://localhost:3000/exames');
    
      if (!examesResponse.ok) {
        throw new Error('Erro ao carregar dados da API');
      }
    
      const examesData = await examesResponse.json();
      setExames(examesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  useEffect(() => {
  
    fetchData();
  }, []); 
return (
  <AppContext.Provider
    value={{
      exames,
      pacientes,
      setPacientes,
      handleAdicionarExame: adicionarExame,
      handleDeletarExame: deletarExame,
      carregarPacientes,
    }}
  >
    {children}
  </AppContext.Provider>
);
};

export default AppProvider;