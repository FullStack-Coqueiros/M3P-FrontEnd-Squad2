import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [exames, setExames] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const adicionarExame = (novoExame) => {
    setExames([...exames, novoExame]);
  };


  const carregarPacientes = async () => {
    try {
        const pacientesResponse = await fetch('http:localhost:3000/pacientes');

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
  }
  
return (
  <AppContext.Provider
    value={{
      exames,
      pacientes,
      setPacientes,
      handleAdicionarExame: adicionarExame,
      carregarPacientes,
    }}
  >
    {children}
  </AppContext.Provider>
);
};

export default AppProvider;