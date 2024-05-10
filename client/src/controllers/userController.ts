import { showAlert } from "../App";

const validadeEmail = (email: string): string[] => { //Deveria mudar string[] para uma interface??
    let newIsEmailValid = ['@', '.'];

    //Deve ter só 1 '@'
    if (email.split('@').length - 1 == 1) {
        newIsEmailValid = newIsEmailValid.filter((char) => char !== '@');
    } 

    if (email.includes('.')){
        newIsEmailValid = newIsEmailValid.filter((char) => char !== '.')
    } 

    return newIsEmailValid;
}

const validadePassword = (password: string): number[] => {

    /*Password regras:
    1. Pelo menos 8 caracteres
    2. Pelo menos uma letra maiúscula
    3. Pelo menos um número
    4. Pelo menos um caractere especial //não existe mais
    */

    let newIsPasswordValid = [1, 2, 3];
    if(password.length >= 8){
        newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 1)
    }

    if(password.match(/[A-Z]/)) {
        newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 2)
    }

    if(password.match(/[0-9]/)) {
        newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 3)

    }

    /*e.target.value.match(/[!@#$%^&*_]/) ?
    newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 4)
    : !newIsPasswordValid.includes(4) && (newIsPasswordValid = [...newIsPasswordValid, 4]);*/

    return newIsPasswordValid;
}

async function handleSignup(name: string, email: string, password: string, remember: boolean): Promise<boolean> {

    //await new Promise(resolve => setTimeout(resolve, 3000));
    //return true;

    try {
        const data = {
            name: name,
            email: email,
            password: password,
            remember: remember
        };

        const response = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return true;
        }
    } catch (err: any) {
        console.log(err);
        showAlert("Erro: " + err.message);
        return false;
    }
}

async function handleLogin(email: string, password: string, remember: boolean): Promise<boolean> {
    try {
        const data = {
            email: email,
            password: password,
            remember: remember
        };

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            console.log('L');
            window.location.href = "https://www.youtube.com/watch?v=KZzJlyjMJws";
            return true;
        }
    } catch (err: any) {
        console.log(err);
        showAlert("Erro: " + err.message);
        return false;
    }
}


export {validadeEmail, validadePassword, handleLogin, handleSignup}