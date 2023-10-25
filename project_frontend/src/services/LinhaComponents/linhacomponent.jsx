import './styles.css';
import { useNavigate } from 'react-router-dom';

function LinhaComponent({ registro, nome, plano, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Se uma função de clique for fornecida, chama ela
    if (onClick) {
      onClick(registro);
    } else {
      // Caso contrário, navega para o prontuário do paciente
      navigate(`/prontuario/${registro}`);
    }
  };

  return (
    <div className='card-linha' onClick={handleClick}>
      <div className="row w-100">
        <div className="col-2">
          <span>{registro}</span>
        </div>
        <div className="col-6">
          <span>{nome}</span>
        </div>
        <div className="col-4">
          <span>{plano}</span>
        </div>
      </div>
    </div>
  );
}

export default LinhaComponent;

