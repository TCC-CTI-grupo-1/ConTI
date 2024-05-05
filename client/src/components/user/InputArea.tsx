import logo from '../../assets/logo.png';
import { showAlert } from '../../App';
import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import Background from "./Background";

const InputArea = () => {

    //Fetch options
    const [loading, setLoading] = useState(false);

    const [isLogin, setIsLogin] = useState(true);

    const[isEmailValid, setIsEmailValid] = useState(['@', '.']);

    /*Password regras:
    1. Pelo menos 8 caracteres
    2. Pelo menos uma letra maiúscula
    3. Pelo menos um número
    4. Pelo menos um caractere especial
    */

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

    function changeLoginPage(){
        //Set all constants to default

        setIsLogin(!isLogin);
        setIsInputsValid(false);
        setName('');
        setEmail('');
        setPassword('');
        setIsEmailValid(['@', '.']);
        setIsPasswordValid([1, 2, 3]);
        setRemember(false);
        setLoading(false);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
        
        if(!isLogin)
        {
            let newIsPasswordValid = isPasswordValid;
            e.target.value.length >= 8 ?
            newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 1)
            : !newIsPasswordValid.includes(1) && (newIsPasswordValid = [...newIsPasswordValid, 1]);
    
            e.target.value.match(/[A-Z]/) ?
            newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 2)
            : !newIsPasswordValid.includes(2) && (newIsPasswordValid = [...newIsPasswordValid, 2]);
    
            e.target.value.match(/[0-9]/) ?
            newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 3)
            : !newIsPasswordValid.includes(3) && (newIsPasswordValid = [...newIsPasswordValid, 3]);
    
            /*e.target.value.match(/[!@#$%^&*_]/) ?
            newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 4)
            : !newIsPasswordValid.includes(4) && (newIsPasswordValid = [...newIsPasswordValid, 4]);*/
    
            //console.log(newIsPasswordValid);
            setIsPasswordValid(newIsPasswordValid);
        }
        
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

    function handleLogin(){
        if (email.length == 0 || password.length == 0) {
            setIsInputsValid(true);
            alert('Preencha todos os campos');
            return;
        }
        const data = {
            email: email,
            password: password,
            remember: remember
        }
        setLoading(true);
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            const responseData = await response.json();
            if (!response.ok) {
                if (responseData.message === 'Perfil não encontrado') {
                    throw new Error('E-mail ou senha incorretos');
                }
                throw new Error(response.statusText);
            } else {
                console.log('L');
                window.location.href = "https://www.youtube.com/watch?v=KZzJlyjMJws";
            }
            return responseData;
        })
        .then(data => {
            console.log(data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            showAlert("Erro: " + err.message);
            setLoading(false);
        })
    }

    function handleSignup(){
        if (name.length == 0 || isEmailValid.length != 0 || isPasswordValid.length != 0) {
            setIsInputsValid(true);
            alert('Preencha todos os campos');
            return;
        }
        const data = {
            name: name,
            email: email,
            password: password,
            remember: remember
        }
        setLoading(true);
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(await responseData.message);
            }
            return responseData;
        })
        .then(data => {
            console.log(data);
            setLoading(false);
        })
        .catch(err => {
            showAlert("Erro: " + err.message);
            setLoading(false);
        })
    }

    return (
        <div className="center full-screen-size">
            <Background signin={!isLogin}/>
            <div id="inputArea">
                <div id="logo" className='center'>
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                        <h2>CONTI</h2>
                    </div>
                    
                    <div className="texto">
                        {!isLogin ? <p>Crie sua conta hoje e comece seus estudos!</p> 
                        : 
                        <p>Faça login com suas credenciais.</p>}
                    </div>
                </div>

                <div id="inputs">
                    {/*Botões do login */}
                    {isLogin && <Input name="email" label="Email" onChange={handleEmailChange}
                    valid={isInputsValid ? email.length > 0 : undefined}/> }
                    {isLogin && <Input name="password" label="Senha" onChange={handlePasswordChange}
                    type='password'
                    valid={isInputsValid ? password.length > 0 : undefined}/>}

                    {/*Botões do Cadastro */}
                    {!isLogin && <>
                        <p>O nome que será usado em seu perfil</p>
                        <Input name="name" label="Nome" onChange={(e) => {setName(e.target.value)}}
                        valid={isInputsValid ? name.length > 0 : undefined}
                        children={<p>O nome que será usado em seu perfil</p>}
                        />
                    </>}
                    {!isLogin && <Input name="email" label="Email" onChange={handleEmailChange} valid={email.length > 0 ? isEmailValid.length == 0 : undefined}
                    children={email.length > 0 ? getEmailValid() : null} />}
                    {!isLogin && <Input name="password" label="Senha" onChange={handlePasswordChange} 
                    valid={password.length > 0? isPasswordValid.length == 0 : undefined} type='password'
                    children={password.length > 0 ? getPasswordValid() : null} />}
                </div>
                <div id="options">
                    <div className="moreOptions">
                        <div>
                            <input type="checkbox" name="remember" id="remember" onClick={
                                () => setRemember(!remember)
                            }/>
                            <label htmlFor="remember">Lembrar de mim</label>
                        </div>
                        <a>Esqueceu a senha?</a>
                    </div>
                    {!isLogin && <Button text={'CADASTRAR'} onClick={handleSignup} 
                    loading={loading}/>}
                    {isLogin && <Button text={'LOGIN'} onClick={handleLogin} 
                    loading={loading}/>}
                    <p>ou</p>
                    <Button text={'Login com Google'} type={2} onClick={() => {showAlert('GOOGLE!')}} />
                </div>
                <div className="noAccount">
                <a onClick={changeLoginPage}>{!isLogin ? 'Já tem uma conta? Faça o login!' : 'Não tem uma conta? Faça o Cadastro!'}</a>
                </div>
            
            </div>
        </div>
    )
}

export default InputArea;