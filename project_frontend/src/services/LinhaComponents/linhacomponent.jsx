import './styles.css'
import { useNavigate } from 'react-router-dom'

function LinhaProntuarioComponent({ registro, nome, plano }) {
    const navigate = useNavigate()

    const navTo = () => {
        navigate(`/prontuario/${registro}`)  
    }

    return (
        <div className='card-linha' onClick={navTo}>
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
    )
}

export default LinhaProntuarioComponent