
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPacientes } from "../../services/pacientes";
import { getConsultas } from "../../services/consultas";
import { getExames } from "../../services/exames";
import LinhaProntuarioComponent from "../../services/LinhaComponents/linhacomponent";
import Sidebar from "../../components/SidebarComponents/Sidebar";
import { URL_API } from "../../services"

function ListaProntuario() {

    const [prontuarios, setProntuarios] = useState([])

    const [prontuariosFiltrados, setProntuariosFiltrados] = useState([])
    const [pacientesFiltrados, setPacientesFiltrados] = useState([])
    const [pacientes, setPacientes] = useState([])
    const [consultas, setConsultas] = useState([])
    const [exames, setExames] = useState([])
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(() => {
        async function getData() {
            const data = await getPacientes()
            const dataConsultas = await getConsultas()
            const dataExames = await getExames()

            setPacientes(data)
            setConsultas(dataConsultas)
            setExames(dataExames)
        }

        getData()
        setPacientesFiltrados(pacientes)
    }, [])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const buscarPacientes = () => {
        const termo = searchTerm.toLocaleLowerCase().trim()
        const resultado = pacientes.filter(item => item.nomeCompleto.toLocaleLowerCase().includes(termo))
        setPacientesFiltrados(resultado)
    }

    return (
        <div>
            <Sidebar />
            {/* <div className="row text-start"> */}
            <div className="my-4">
                <h4>Utilize a barra de pesquisa para buscar</h4>
            </div>
            <div className='row mt-3'>
                <div className='col-10'>
                    <input value={searchTerm} onChange={handleSearch} className='form-control w-100' type='text' placeholder='Digite o nome do paciente' />
                </div>
                <div className='col-2'>
                    <button className='btn btn-primary w-100' onClick={buscarPacientes}>Buscar</button>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-2">Registro</div>
                <div className="col-6">Nome do paciente</div>
                <div className="col-4">Convênio</div>
            </div>

            <div className="row">
                {pacientesFiltrados.map(pacientes => {
                    return <LinhaProntuarioComponent key={pacientes.id} registro={pacientes.id} nome={pacientes.nomeCompleto} plano={pacientes.convenio}/>
                })}                
            </div>

            
        </div>
    )
}

export default ListaProntuario