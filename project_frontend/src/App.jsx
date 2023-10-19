import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
// import './App.css'
import Login from './pages/Login/Login'
import ResetSenha from './pages/Reset/RecSenha'
import CriarConta from './pages/Conta/criarConta'
import CadastroDieta from './pages/CadastroDieta/CadastroDieta'
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario'
import CadastroExames from './pages/CadastroExames/CadastroExames'
import CadastroConsulta from './pages/CadastroConsulta/CadastroConsulta'
import CadastroMedicamento from './pages/CadastroMedicamento/CadastroMedicamento'
import CadastroExercicio from './pages/CadastroExercicio/CadastroExercicio'
import CadastroPaciente from './pages/CadastroPaciente/CadastroPaciente'
import ListaProntuario from './pages/ListaProntuario/ListaProntuario'
import Prontuario from './pages/Prontuario/Prontuario'
import Dashboard from './components/Dashboard/Dashboard'

function App() {

  return (
    <div className='container'>
      <div className='row'>
        <main className="bg-default" style={{ 'padding': '20px 100px' }}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path='/resetsenha' element={<ResetSenha />} />
              <Route path='/criarconta' element={<CriarConta />} />
              <Route path='/cadastrodieta' element={<CadastroDieta />} />
              <Route path='/cadastrousuario' element={<CadastroUsuario />} />
              <Route path='/cadastropaciente' element={<CadastroPaciente/>}/>
              <Route path='/CadastroExames' element={<CadastroExames />} />
              <Route path='/CadastroConsulta' element={<CadastroConsulta />} />
              <Route path='/CadastroMedicamento' element={<CadastroMedicamento />} />
              <Route path='/CadastroExercicio' element={<CadastroExercicio />} />
              <Route path='/ListaProntuario' element={<ListaProntuario />} />
              <Route path='/Prontuario' element={<Prontuario />} />
              <Route path='/Dashboard' element={<Dashboard />} />
            </Routes>
          </Router>
        </main>
      </div>
    </div>
  )
}

export default App