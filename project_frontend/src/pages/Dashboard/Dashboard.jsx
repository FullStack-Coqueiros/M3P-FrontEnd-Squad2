import React, { useState, useEffect } from "react";
import { Card, Col, Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {IoPersonCircleOutline } from 'react-icons/io5';

import DashboardCard from "../../components/DashboardComponets/DashboardCard";
import Sidebar from "../../components/SidebarComponents/Sidebar";

import { URL_API } from "../../services";

function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [exames, setExames] = useState([]);

  useEffect(() => {
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


    // Fetch para consultas e exames aqui (semelhante ao exemplo acima)
  }, []);

  return (
    <>
      <Sidebar />

      <Container>
        <h1>Painel de Controle</h1>
        <Row>
          <Col>
            <DashboardCard titulo="Pacientes Cadastrados" quantidade={pacientes.length} />
          </Col>
          <Col>
            <DashboardCard titulo="Consultas Realizadas" quantidade={consultas.length} />
          </Col>
          <Col>
            <DashboardCard titulo="Exames Realizados" quantidade={exames.length} />
          </Col>
        </Row>

        <h1>PACIENTES</h1>
        <div className="cards">
          <Row xs={1} sm={2} md={3} className="mb-4">
            {pacientes.map((paciente) => (
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
                    <Link to={`/prontuario${paciente.id}`}>
                      <Button className="btn-ver">Ver mais</Button>
                    </Link>
                  </Col>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
