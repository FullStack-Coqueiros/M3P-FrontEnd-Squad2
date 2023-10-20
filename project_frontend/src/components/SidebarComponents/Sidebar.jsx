import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillHouseAddFill, BsHeartPulse, BsPersonPlus, BsListCheck } from 'react-icons/Bs';
import { GiStethoscope } from 'react-icons/Gi';
import { IoRestaurantOutline } from 'react-icons/io5';
import { CiDumbbell, CiPill } from 'react-icons/Ci';
import { BiLogOut } from 'react-icons/Bi';


import './styles.css'
function Sidebar() {
  return (
    <div className="sidebar">
      <Link className="active" to="/Dashboard" >HOME</Link>
      <Link to="/cadastropaciente" >Cadastro Paciente</Link>
      <Link to="/cadastrousuario" >Cadastro Usuário </Link>
      <Link to="/CadastroExames" >Cadastro Exames </Link>
      <Link to="/cadastrodieta" >Cadastro Dieta</Link>
      <Link to="/CadastroConsulta" >Cadastro Consulta </Link>
      <Link to="/CadastroExames" >Cadastro Exames </Link>
      <Link to="/CadastroMedicamento" >Cadastro Medicamento </Link>
      <Link to="/CadastroExercicio" >Cadastro Exercicio </Link>
      <Link to="/ListaProntuario" >Lista Prontuario </Link>
      <Link to="/Prontuario" > Prontuario </Link>
      <div className="logout-button">
        <Link to="/" className="logout-link">
          <BiLogOut /> Sair
        </Link>
      </div>
    </div>



  );
}

export default Sidebar;
