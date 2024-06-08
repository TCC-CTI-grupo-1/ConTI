import { useState } from 'react';
import Input from '../../Input';
import Options from "./Options";
import Logo from './Logo';
import { useNavigate } from "react-router-dom";

import { validadeEmail, validadePassword, handleSignup } from '../../../controllers/userController';
import { showAlert } from '../../../App';


interface Props{
    changeLoginPage: () => void

}

const Signup = ({changeLoginPage}:Props) => {

    //Change URL
    const navigate = useNavigate();


    //Fetch options
    const [loading, setLoading] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(['@', '.']);

    

    const[isPasswordValid, setIsPasswordValid] = useState([1, 2, 3]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    //A ideia e que, se for true, todos os inputs recebem as "caixinhas vermelhas" em volta,
    //E não só de e-mail e senha, pedindo para que o usuario preencha os outros valores
    const[isInputsValid, setIsInputsValid] = useState(false);

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
        let newIsEmailValid = validadeEmail(e.target.value);
        setIsEmailValid(newIsEmailValid);
        
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
        let newIsPasswordValid = validadePassword(e.target.value);
        setIsPasswordValid(newIsPasswordValid);
        
    }

    function getEmailValid():React.ReactNode {
        let node: React.ReactNode | null = null;
        isEmailValid.forEach((char) => {
            switch(char){
                case '@':
                    node = <>{node}<p>O email deve conter exatamente um '@'</p></>;
                    break;
                case '.':
                    node = <>{node}<p>O email deve conter pelo menos um '.'</p></>;
                    break;
            }
        });
        return node;
    }

    function getPasswordValid():React.ReactNode {
        let node: React.ReactNode | null = null;
        isPasswordValid.forEach((rule) => {
            switch(rule){
                case 1:
                    node = <>{node}<p>A senha deve conter pelo menos 8 caracteres</p></>;
                    break;
                case 2:
                    node = <>{node}<p>A senha deve conter pelo menos uma letra maiúscula</p></>;
                    break;
                case 3:
                    node = <>{node}<p>A senha deve conter pelo menos um número</p></>;
                    break;
                /*case 4:
                    node = <>{node}<p>A senha deve conter pelo menos um caractere especial</p></>;
                    break;*/
            }
        });
        return node;
    }

    async function handleSignupButtonClick(){
        if (name.length == 0 || isEmailValid.length != 0 || isPasswordValid.length != 0) {
            setIsInputsValid(true);
            showAlert('Preencha todos os campos', 'warning');
            return;
        }
        else{
            setLoading(true);
            const signupSuccess = await handleSignup(name, email, password, remember);
            setLoading(false);

            if(signupSuccess == null){
                showAlert("Cadastro efetuado com sucesso", 'success')
                navigate('/profile');
            }
            else{
                showAlert("Erro: " + signupSuccess);
            }
        }
    }


    return (
        <div id="inputArea">
                <Logo type={'signup'}/>

                <div id="inputs">               
                    <>
                        <p style={{display: 'none'}}>O nome que será usado em seu perfil</p>
                        <Input name="name" label="Nome" onChange={(e) => {setName(e.target.value)}}
                        valid={isInputsValid ? name.length > 0 : undefined}
                        children={<p>O nome que será usado em seu perfil</p>}
                        />
                    </>
                    <Input name="email" label="Email" onChange={handleEmailChange} valid={
                        email.length > 0 || isInputsValid ? isEmailValid.length == 0 : undefined}
                    children={email.length > 0 ? getEmailValid() : null} />
                    <Input name="password" label="Senha" onChange={handlePasswordChange} 
                    valid={password.length > 0 || isInputsValid ? isPasswordValid.length == 0 : undefined} type='password'
                    children={password.length > 0 ? getPasswordValid() : null} />
                </div>

                <Options type={'signup'} 
                onClick={handleSignupButtonClick}
                changeScreen={changeLoginPage}
                loading={loading}
                onRemember={setRemember}
                />         
            </div>
        
    )
}


export default Signup;