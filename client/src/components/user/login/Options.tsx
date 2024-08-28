import Button from "../../Button"
import { showAlert } from "../../../App"
import { Checkbox } from '@chakra-ui/react'

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
                        <Checkbox
                        onChange={(e) => {
                            onRemember(e.target.checked)
                        }}>Lembrar de mim</Checkbox>
                        <a>Esqueceu a senha?</a>
                    </div>
                    <Button onClick={onClick} 
                    loading={loading}
                    width="100%">
                        {type == 'login' ? 'LOGIN' : 'CADASTRAR-SE'}
                    </Button>
                    
                    <p>ou</p>
                    <Button variant='outline' onClick={() => {showAlert('GOOGLE!', 'success')}} 
                    width="100%">
                        Login com o google
                    </Button>

                    <div className="noAccount">
                        <a onClick={changeScreen}>{type=='signup' ? 'Já tem uma conta? Faça o login!' : 'Não tem uma conta? Faça o Cadastro!'}</a>
                    </div>
                </div>
    ); 
}

export default Options;