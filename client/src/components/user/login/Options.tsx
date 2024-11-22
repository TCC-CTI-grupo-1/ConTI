import Button from "../../Button"
import { showAlert } from "../../../App"
import { Checkbox } from '@chakra-ui/react'

interface Props{
    type: 'login' | 'signup'
    onClick: () => void
    changeScreen: () => void
    loading: boolean
    onRemember: (remember: boolean) => void
    forgorPasswordClick: () => void
}

const Options = ({type, onClick, changeScreen, loading, onRemember, forgorPasswordClick}: Props) => {
    return (
        <div id="options">
                    <div className="moreOptions">
                        <Checkbox
                        onChange={(e) => {
                            onRemember(e.target.checked)
                        }}>Lembrar de mim</Checkbox>
                        <a onClick={forgorPasswordClick}>Esqueceu a senha?</a>
                    </div>
                    <Button onClick={onClick} 
                    loading={loading}
                    width="100%">
                        {type == 'login' ? 'LOGIN' : 'CADASTRAR-SE'}
                    </Button>

                    <div className="noAccount">
                        <a onClick={changeScreen}>{type=='signup' ? 'Já tem uma conta? Faça o login!' : 'Não tem uma conta? Faça o Cadastro!'}</a>
                    </div>
                </div>
    ); 
}

export default Options;