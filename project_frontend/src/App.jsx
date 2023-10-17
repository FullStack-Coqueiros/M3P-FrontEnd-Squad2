import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import ResetSenha from './pages/Reset/RecSenha'
import CriarConta from './pages/Conta/criarConta'
import CadastroDieta from './pages/CadastroDieta/CadastroDieta'


function App() {

  return (
    <div className='container'>
      <div className='row'>

        <main className="bg-default" style={{ 'padding': '20px 100px'}}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path='/resetsenha' element={<ResetSenha />} />
              <Route path='/criarconta' element={<CriarConta />} />
              <Route path='/cadastrodieta' element={<CadastroDieta />} />
            </Routes>
          </Router>
        </main>

      </div>
    </div>
  )
}

export default App