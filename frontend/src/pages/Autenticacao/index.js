import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const Autenticacao = () => {

    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [isPasswordIncorrect, setPasswordIncorrect] = useState(false);

    function handleAuthentication() {
        // Insira o Código de autenticação

        // REMOVA APÓS ESCREVER A FUNÇÃO INTEIRA!
        navigate("/agendamentos");
        
        /* if (hashEquals === true) {
            navigate("/agendamentos");
        } else {
            setPasswordIncorrect(true);
        } */
    }

    return(
        <div className="col p-5 overflow-auto h-100">
            <form>
                <div className="row">
                    <div className="col-12">
                        <div className="w-100 d-flex justify-content-between">
                            <h2 className="mb-4 mt-0">Acesso de Gerente</h2>
                        </div>
                    </div>
                </div>
                
                <div className='row'>    
                    <div className='col-12'>
                        <div className="w-100 d-flex justify-content-center flex-column">
                            <div className='m-5'>
                                <label for='adm-password-field'>Senha:</label>
                                <input 
                                    id="adm-password-field"
                                    className="form-control"
                                    type="password"
                                    placeholder='Insira a senha de Gerente'
                                    value={password}
                                    onChange={(ev) => setPassword(ev.target.value)}
                                    required
                                    >
                                </input>
                                {isPasswordIncorrect === true ? (
                                    <div className='text-danger'>Senha incorreta</div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>    
                    <div className='col-12'>
                        <div className="w-100 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary btn-lg" id='submit-adm' onClick={handleAuthentication}>
                                <span>Entrar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );  
};

export default Autenticacao;  
