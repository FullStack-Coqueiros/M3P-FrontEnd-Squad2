import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
function Sidebar() {
  return (
    <div className="sidebar">
      <Link className="active" to="/Dashboard" >HOME</Link>
      <Link to="/cadastrousuario" >Cadastro Usuário </Link>
      <Link to="/CadastroExames" >Cadastro Exames </Link>
      <Link to="/cadastrodieta" >Cadastro Dieta</Link>
      <Link to="/CadastroConsulta" >Cadastro Consulta </Link>
      <Link to="/CadastroExames" >Cadastro Exames </Link>
      <Link to="/CadastroMedicamento" >Cadastro Medicamento </Link>
      <Link to="/CadastroExercicio" >Cadastro Exercicio </Link>
      <Link to="/ListaProntuario" >Lista Prontuario </Link>
      <Link to="/Prontuario" > Prontuario </Link>
      <Link to="/" className="btn btn-primary">Logout</Link>
    </div>
    
    
  );
}

export default Sidebar;
