import React from 'react';
import { Link } from 'react-router-dom';
import {BsFillHouseAddFill, BsHeartPulse, BsPersonPlus, BsListCheck} from 'react-icons/Bs';
import {GiStethoscope} from 'react-icons/Gi';
import { IoRestaurantOutline } from 'react-icons/io5';
import { CiDumbbell, CiPill } from 'react-icons/Ci';
import { BiLogOut } from 'react-icons/Bi'; 


import './styles.css'
function Sidebar() {
  return (
    <div className="sidebar">
      <Link className="active" to="/Dashboard"><BsFillHouseAddFill/>  HOME</Link>
      <Link to="/cadastrousuario" ><BsPersonPlus/> Cadastro Usuário </Link>
      <Link to="/CadastroExames" ><BsHeartPulse/> Cadastro Exames </Link>
      <Link to="/cadastrodieta" ><IoRestaurantOutline/> Cadastro Dieta</Link>
      <Link to="/CadastroConsulta" ><GiStethoscope/> Cadastro Consulta </Link>
      <Link to="/CadastroMedicamento" ><CiPill/> Cadastro Medicamento</Link>
      <Link to="/CadastroExercicio" ><CiDumbbell/>  Cadastro Exercicio </Link>
      <Link to="/ListaProntuario" ><BsListCheck/> Lista Prontuario </Link>
      <Link to="/Prontuario" > Prontuario </Link>
      <div className="logout-button">
        <Link to="/" className="btn btn-primary">
          <BiLogOut /> Sair
        </Link>
      </div>
      </div>
   
    
    
  );
}

export default Sidebar;
