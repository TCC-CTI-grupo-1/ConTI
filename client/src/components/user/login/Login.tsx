import { useState } from 'react';
import Input from '../../Input';
import Options from "./Options";
import Logo from './Logo';
import { useNavigate } from "react-router-dom";


import { handleLogin } from '../../../controllers/userController';
import { showAlert } from '../../../App';


interface Props{
    changeLoginPage: () => void

}

const Login = ({changeLoginPage}:Props) => {

    //Change URL
    const navigate = useNavigate();

    //Fetch options
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    
    //A ideia e que, se for true, todos os inputs recebem as "caixinhas vermelhas" em volta,
    //E não só de e-mail e senha, pedindo para que o usuario preencha os outros valores
    const[isInputsValid, setIsInputsValid] = useState(false);

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);      
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);     
    }


    async function handleLoginButtonClick(){
        //showAlert("Clicou", "success");
        if (email.length == 0 || password.length == 0) {
            setIsInputsValid(true);
            showAlert('Preencha todos os campos', 'warning');
            return;
        }
        else{
            setLoading(true);
            const [loginSuccess, loginMessage] = await handleLogin(email, password, remember);
            setLoading(false);

            console.log(loginSuccess);
            if (loginSuccess) {
                showAlert("Login bem sucedido!", "success");
                //console.log("L");
                navigate("/profile");

            }
            else{
                //console.log("E");
                showAlert(loginMessage, "error");
            }
        }
    }


    return (
        <div id="inputArea">
                <Logo type={'login'}/>

                <div id="inputs">               
                    <Input name="email" label="Email" onChange={handleEmailChange}
                    valid={isInputsValid ? email.length > 0 : undefined}/> 
                    <Input name="password" label="Senha" onChange={handlePasswordChange}
                    type='password'
                    valid={isInputsValid ? password.length > 0 : undefined}/>
                </div>

                <Options type={'login'} 
                onClick={handleLoginButtonClick}
                changeScreen={changeLoginPage}
                loading={loading}
                onRemember={setRemember}
                />         
            </div>
        
    )
}

/*<div className="center full-screen-size">
            <Background signin={!isLogin}/>
            
        </div>
*/

/*

{/*Botões do login /}

*/
export default Login;