import { Profile } from '../../../server/src/types/express-session';

const validadeEmail = (email: string): string[] => { //Deveria mudar string[] para uma interface??
    let newIsEmailValid = ['@', '.', 't'];

    //Deve ter só 1 '@'
    if (email.split('@').length - 1 == 1) {
        newIsEmailValid = newIsEmailValid.filter((char) => char !== '@');
    }

    if (email.includes('.')) {
        newIsEmailValid = newIsEmailValid.filter((char) => char !== '.');
    }

    if (email.indexOf('@') < email.lastIndexOf('.')){
        newIsEmailValid = newIsEmailValid.filter((char) => char !== 't');
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
    if (password.length >= 8) {
        newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 1)
    }

    if (password.match(/[A-Z]/)) {
        newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 2)
    }

    if (password.match(/[0-9]/)) {
        newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 3)

    }

    /*e.target.value.match(/[!@#$%^&*_]/) ?
    newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 4)
    : !newIsPasswordValid.includes(4) && (newIsPasswordValid = [...newIsPasswordValid, 4]);*/

    return newIsPasswordValid;
}

async function handleSignup(name: string, email: string, password: string, remember: boolean): Promise<string | null> {

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
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return null;
        }
    } catch (err: any) {
        return err.message;
    }
}

async function handleLogin(email: string, password: string, remember: boolean): Promise<[boolean, string]> {
    try {
        const data = {
            email: email,
            password: password,
            remember: remember
        };

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            //window.location.href = 'https://projetoscti.com.br/projetoscti24/TCC_TEMP';
            return [true, "Login bem sucedido"];
        }
    } catch (err: any) {
        return [false, err.message];

    }
}

async function getUser(): Promise<Profile | null> {
    try {
        const response = await fetch('http://localhost:3001/userSession', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("DAAAAAAAAAAAAAAAAAAAAAAAA")
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.profile;
        }
    }catch (err: any){
        return null;
    }
}

async function handleChange(name: string, email: string): Promise<boolean> {
    try {
        const data = {
            name: name,
            email: email
        };

        const response = await fetch('http://localhost:3001/updateUser', {
            method: 'PATCH',
            credentials: 'include',
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
        return false;
    }
}


async function handleSaveChanges(Profile : Profile): Promise<boolean> {
    try {
        const response = await fetch('http://localhost:3001/updateUser', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Profile)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return true;
        }
    
    } catch (err: any) {
        return false;
    }
}

async function handleLogout(){
    try {
        const response = await fetch('http://localhost:3001/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            window.location.href = 'http://localhost:5173/';
            // return [true, "Logout bem sucedido"];
        }
    } catch (err: any) {
        return [false, "Logout falhou"];
    }
    
}
async function handleDeleteAccount(){
    try {
        const response = await fetch('http://localhost:3001/deleteUser', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            window.location.href = 'http://localhost:5173/';
            // return [true, "Conta deletada com sucesso"];
        }

        const responseLogout = await fetch('http://localhost:3001/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseDataLogout = await responseLogout.json();
        if (!responseLogout.ok) {
            throw new Error(responseDataLogout.message);
        } else {
            window.location.href = 'http://localhost:5173/';
            // return [true, "Logout bem sucedido"];
        }
        
    } catch (err: any) {
        return [false, "Erro ao deletar conta"];
    }
}



export { validadeEmail, validadePassword, handleLogin, handleSignup, getUser, handleChange, handleDeleteAccount, handleLogout, handleSaveChanges };