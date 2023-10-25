import React, { useState, useEffect } from "react";
import { Card, Col, Button, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from 'react-icons/io5';

import Sidebar from "../../components/SidebarComponents/Sidebar";
import DashboardCard from "../../components/DashboardComponets/DashboardCard";

import { URL_API } from "../../services";


function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [exames, setExames] = useState([]);
  const [medicamento, setMedicamento] = useState([]);
  const [dietas, setDietas] = useState([]);
  const [exercicios, setExercicios] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [termoPesquisaUsuario, setTermoPesquisaUsuario] = useState("");
  
  const isAdmin = true; // ou const isAdmin = false;

  if (isAdmin) {
    
    console.log("Usuário é um administrador.");
  } else {
    
    console.log("Usuário não é um administrador.");
  }

  useEffect(() => {
    fetch(`${URL_API}/usuarios`)
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Erro ao buscar dados:', error));

    fetch(`${URL_API}/pacientes`)
      .then(response => response.json())
      .then(data => setPacientes(data))
      .catch(error => console.error('Erro ao buscar dados:', error));

    fetch(`${URL_API}/consultas`)
      .then(response => response.json())
      .then(data => setConsultas(data))
      .catch(error => console.error('Erro ao buscar dados:', error));

    fetch(`${URL_API}/exames`)
      .then(response => response.json())
      .then(data => setExames(data))
      .catch(error => console.error('Erro ao buscar dados:', error));

    fetch(`${URL_API}/medicamentos`)
      .then(response => response.json())
      .then(data => setMedicamento(data))
      .catch(error => console.error('Erro ao buscar dados:', error));

    fetch(`${URL_API}/dietas`)
      .then(response => response.json())
      .then(data => setDietas(data))
      .catch(error => console.error('Erro ao buscar dados:', error));

    fetch(`${URL_API}/exercicios`)
      .then(response => response.json())
      .then(data => setExercicios(data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  return (
    <>
      <Sidebar />
      <Container>

        {isAdmin ? (
          // Se for administrador
          <>
        <h1>Estatísticas do Sistema</h1>
        <DashboardCard estatisticas={[
  { titulo: "Usuários Cadastrados", quantidade: usuarios.length, color: "#192fac" },
  { titulo: "Pacientes Cadastrados", quantidade: pacientes.length, color: "rgb(100, 161, 231)" },
  { titulo: "Consultas Realizadas", quantidade: consultas.length, color: "#9bc6e2" },
  { titulo: "Exames Realizados", quantidade: exames.length, color: "#88def3" },
  { titulo: "Dietas Realizadas", quantidade: dietas.length, color: "#23dada" },
  { titulo: "Medicamentos prescritos", quantidade: medicamento.length, color: "#1dd1aa" },
  { titulo: "Exercícios solicitados", quantidade: exercicios.length, color: "#33ff66" },
]} />
            <h1>Pesquise o usuario</h1>
            <div className="cards">
              <div className="d-flex justify-content-center mb-4">
                <Form.Control
                  type="text"
                  placeholder="Pesquisar por nome, CPF, telefone ou e-mail"
                  value={termoPesquisaUsuario}
                  onChange={(e) => setTermoPesquisaUsuario(e.target.value)}
                />
              </div>
            </div>
            <Row xs={1} sm={2} md={3} className="mb-4">
              {usuarios
                .filter((usuario) => {
                  const termoLowerCase = termoPesquisaUsuario.toLowerCase();
                  return (
                    usuario.nome.toLowerCase().includes(termoLowerCase) ||
                    usuario.cpf.includes(termoPesquisaUsuario) ||
                    usuario.telefone.includes(termoPesquisaUsuario) ||
                    usuario.email.toLowerCase().includes(termoLowerCase)
                  );
                })
                  .map((usuario, index) => (
                    <Col key={index} className="mb-4">
                      <Card style={{ width: "300px", height: "400px" }} className="text-center d-flex flex-column align-items-center">
                        <IoPersonCircleOutline className="foto mt-3" size={150} color="#000" />
                        <Card.Body className="mt-3">
                          <Card.Title>
                            <div>{usuario.nome}</div>
                            <div>{usuario.tipo}</div>
                            <div>{usuario.genero}</div>
                            {/* <div>{usuario.cpf}</div> */}
                            <div>{usuario.telefone}</div>
                            <div>{usuario.email}</div>
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
            </Row>


            <h1>Pesquise o paciente</h1>
            <div className="cards">
              <div className="d-flex justify-content-center mb-4">
                <Form.Control
                  type="text"
                  placeholder="Pesquisar por nome, CPF, telefone ou e-mail"
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                />
              </div>
            </div>
            <Row xs={1} sm={2} md={3} className="mb-4">
              {pacientes
                .filter((paciente) => {
                  const termoLowerCase = termoPesquisa.toLowerCase();
                  return (
                    paciente && paciente.nomeCompleto && paciente.nomeCompleto.toLowerCase().includes(termoLowerCase) ||
                    paciente.cpf.includes(termoPesquisa) ||
                    paciente.telefone.includes(termoPesquisa) ||
                    paciente.email.toLowerCase().includes(termoLowerCase)
                  );
                })
                .map((paciente) => (
                  <Col key={paciente.id} className="mb-4">
                    <Card style={{ width: "300px", height: "400px" }} className="text-center d-flex flex-column align-items-center">
                      <IoPersonCircleOutline className="foto mt-3" size={150} color="#000" />
                      <Card.Body className="mt-3">
                        <Card.Title>
                          <div>{paciente.nomeCompleto}</div>
                          <div>Nascimento: {paciente.dataNascimento}</div>
                          <div>Telefone: {paciente.telefone}</div>
                          <div>Email: {paciente.email}</div>
                        </Card.Title>
                      </Card.Body>
                      <Col xs={12}>
                        <Link to={`/Prontuario${paciente.id}`}>
                          <Button className="btn-ver">Ver mais</Button>
                        </Link>
                      </Col>
                    </Card>
                  </Col>
                ))}
            </Row>
          </>
        ) : (
          // Se não for administrador
          <>
            <h2>PACIENTES</h2>
            <Row xs={1} sm={2} md={3} className="mb-4">
              {pacientes
                .filter((paciente) => {
                  const termoLowerCase = termoPesquisa.toLowerCase();
                  return (
                    paciente && paciente.nomeCompleto && paciente.nomeCompleto.toLowerCase().includes(termoLowerCase) ||
                    paciente.cpf.includes(termoPesquisa) ||
                    paciente.telefone.includes(termoPesquisa) ||
                    paciente.email.toLowerCase().includes(termoLowerCase)
                  );
                })
                .map((paciente) => (
                  <Col key={paciente.id} className="mb-4">
                    <Card style={{ width: "300px", height: "400px" }} className="text-center">
                      <IoPersonCircleOutline className="foto mt-3" size={150} color="#000" />
                      <Card.Body className="mt-3">
                        <Card.Title>
                          <div>{paciente.nomeCompleto}</div>
                          <div>Nascimento: {paciente.dataNascimento}</div>
                          <div>Telefone: {paciente.telefone}</div>
                        
                        </Card.Title>
                      </Card.Body>
                      <Col xs={12}>
                        <Link to={`/Prontuario${paciente.id}`}>
                          <Button className="btn-ver">Ver mais</Button>
                        </Link>
                      </Col>
                    </Card>
                  </Col>
                ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
