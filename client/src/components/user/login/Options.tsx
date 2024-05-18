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
                    <Button text={type == 'login' ? 'LOGIN' : 'CADASTRAR-SE'} onClick={onClick} 
                    loading={loading}/>
                    <p>ou</p>
                    <Button text={'Login com Google'} variant='outline' onClick={() => {showAlert('GOOGLE!', 'success')}} />

                    <div className="noAccount">
                        <a onClick={changeScreen}>{type=='signup' ? 'Já tem uma conta? Faça o login!' : 'Não tem uma conta? Faça o Cadastro!'}</a>
                    </div>
                </div>
    ); 
}

export default Options;