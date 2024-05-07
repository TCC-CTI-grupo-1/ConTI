import Button from "../Button"
import { showAlert } from "../../App"

interface Props{
    type: 'login' | 'signup'
    onClick: () => void
    changeScreen: () => void
    loading: boolean
    onRemember: (remember: boolean) => void
}

const Options = ({type, onClick, changeScreen, loading, onRemember}: Props) => {
    return (
        <div id="options">
                    <div className="moreOptions">
                        <div>
                            <input type="checkbox" name="remember" id="remember" onClick={
                                (e) => onRemember((e.target as HTMLInputElement).checked)
                            }/>
                            <label htmlFor="remember">Lembrar de mim</label>
                        </div>
                        <a>Esqueceu a senha?</a>
                    </div>
                    <Button text={type == 'login' ? 'LOGIN' : 'CADASTRAR-SE'} onClick={onClick} 
                    loading={loading}/>
                    <p>ou</p>
                    <Button text={'Login com Google'} type={2} onClick={() => {showAlert('GOOGLE!')}} />

                    <div className="noAccount">
                        <a onClick={changeScreen}>{type=='signup' ? 'Já tem uma conta? Faça o login!' : 'Não tem uma conta? Faça o Cadastro!'}</a>
                    </div>
                </div>
    ); 
}

export default Options;