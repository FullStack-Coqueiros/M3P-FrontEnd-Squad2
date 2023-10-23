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
      <Link className="active" to="/Dashboard" >  <BsFillHouseAddFill />  HOME</Link>
      <Link to="/cadastrousuario" > < BsPersonPlus/> Cadastro Usuário </Link>
      <Link to="/cadastropaciente" > <BsPersonPlus /> Cadastro Paciente</Link>
      <Link to="/cadastroConsulta" > <GiStethoscope  /> Cadastro Consulta </Link>
      <Link to="/CadastroExames" > <BsHeartPulse /> Cadastro Exames </Link>
      <Link to="/cadastrodieta" ><IoRestaurantOutline /> Cadastro Dieta</Link>
      <Link to="/cadastroExercicio" > < CiDumbbell /> Cadastro Exercicio </Link>
      <Link to="/cadastroMedicamento" > <CiPill  /> Cadastro Medicamento </Link>
      <Link to="/listaProntuario" > <BsListCheck /> Lista Prontuario </Link>
      <Link to="/prontuario" > <BiLogOut /> prontuario </Link>
      <div className="logout-button">
        <Link to="/" className="logout-link">
          <BiLogOut /> Sair
        </Link>
      </div>
    </div>



  );
}

export default Sidebar;
