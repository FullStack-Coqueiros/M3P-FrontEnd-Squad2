import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPacientes } from '../../services/pacientes';
import LinhaProntuarioComponent from '../../services/LinhaComponents/linhacomponent';
import Sidebar from '../../components/SidebarComponents/Sidebar';

function ListaProntuario() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pacientesOriginais, setPacientesOriginais] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getPacientes();
      setPacientes(data);
      setPacientesOriginais(data);  // Salvar a lista original
    }

    getData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const termo = searchTerm.toLowerCase().trim();
    const resultado = pacientesOriginais.filter((item) =>
      item.nomeCompleto.toLowerCase().includes(termo) || String(item.id) === termo
    );
    setPacientes(resultado);
  }, [searchTerm, pacientesOriginais]);

  return (
    <div>
      <Sidebar />
      <div className="my-4">
        <h4>Utilize a barra de pesquisa para buscar</h4>
      </div>
      <div className="row mt-3">
        <div className="col-10">
          <input
            value={searchTerm}
            onChange={handleSearch}
            className="form-control w-100"
            type="text"
            placeholder="Digite o nome ou ID do paciente"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-2">Registro</div>
        <div className="col-6">Nome do paciente</div>
        <div className="col-4">Convênio</div>
      </div>

      <div className="row">
        {pacientes.map((paciente) => (
          <div key={paciente.id} className="col-12">
            <Link to={`/prontuario/${paciente.id}`}>
              <LinhaProntuarioComponent
                registro={paciente.id}
                nome={paciente.nomeCompleto}
                plano={paciente.convenio}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProntuario;