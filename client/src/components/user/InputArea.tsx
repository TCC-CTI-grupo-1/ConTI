import logo from '../../assets/logo.png';
import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';

const InputArea = () => {
    const [isLogin, setIsLogin] = useState(true);

    const[isEmailValid, setIsEmailValid] = useState(['@', '.']);

    /*Password regras:
    1. Pelo menos 8 caracteres
    2. Pelo menos uma letra maiúscula
    3. Pelo menos um número
    4. Pelo menos um caractere especial
    */

    const[isPasswordValid, setIsPasswordValid] = useState([1, 2, 3, 4]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);

        if(!isLogin)
        {
            let newIsEmailValid = isEmailValid;

            //Deve ter só 1 '@'
            if (e.target.value.split('@').length - 1 == 1) {
                newIsEmailValid = newIsEmailValid.filter((char) => char !== '@');
            } else if (!newIsEmailValid.includes('@')) {
                newIsEmailValid = [...newIsEmailValid, '@'];
            }

            e.target.value.includes('.') ? 
            newIsEmailValid = newIsEmailValid.filter((char) => char !== '.')
            : !newIsEmailValid.includes('.') && (newIsEmailValid = [...newIsEmailValid, '.']);

            //console.log(newIsEmailValid);
            setIsEmailValid(newIsEmailValid);
        }
        
    }


    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
        
        if(!isLogin)
        {
            let newIsPasswordValid = isPasswordValid;
            e.target.value.length >= 8 ?
            newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 1)
            : !newIsPasswordValid.includes(1) && [...newIsPasswordValid, 1];
    
            e.target.value.match(/[A-Z]/) ?
            newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 2)
            : !newIsPasswordValid.includes(2) && [...newIsPasswordValid, 2];
    
            e.target.value.match(/[0-9]/) ?
            newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 3)
            : !newIsPasswordValid.includes(3) && [...newIsPasswordValid, 3];
    
            e.target.value.match(/[!@#$%^&*]/) ?
            newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 4)
            : !newIsPasswordValid.includes(4) && [...newIsPasswordValid, 4];
    
            //console.log(newIsPasswordValid);
            setIsPasswordValid(newIsPasswordValid);
        }
        
    }



    return (
        <div id="inputArea">
            <div id="logo" className='center'>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <h2>CONTI</h2>
                </div>
                
                <div className="texto">
                    {isLogin ? <p>Crie sua conta hoje e comece seus estudos!</p> 
                    : 
                    <p>Faça login com suas credenciais.</p>}
                </div>
            </div>
            
            <div id="inputs">
                <Input name="email" label="Email" onChange={handleEmailChange}/>
                <Input name="password" label="Senha" onChange={handlePasswordChange}/>
            </div>
            <div id="options">
                <div className="moreOptions">
                    <div>
                        <input type="checkbox" name="remember" id="remember"/>
                        <p>Lembrar-me</p>
                    </div>
                    <a>Esqueceu a senha?</a>
                </div>
                <Button text={isLogin ? 'CADASTRAR' : 'LOGIN'} onClick={() => setIsLogin(!isLogin)} />
                <p>ou</p>
                <Button text={'Login com Google'} type={2} onClick={() => {}} />
            </div>
            <div className="noAccount">
                <a>{isLogin ? 'Já tem uma conta? Faça o login!' : 'Não tem uma conta? Faça o Cadastro!'}</a>
            </div>
            
        </div>
    )
}

export default InputArea;