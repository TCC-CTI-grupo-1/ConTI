
//import { json } from 'react-router-dom';
import { area_ProfileInterface, profileInterface } from './interfaces';


const  validateEmail = (email: string): string[] => { //Deveria mudar string[] para uma interface??
    let newIsEmailValid = ['@', '.', 't'];

    //Deve ter só 1 '@'
    if (email.split('@').length - 1 == 1) {
        newIsEmailValid = newIsEmailValid.filter((char) => char !== '@');
    }

    if (email.includes('.')) {
        newIsEmailValid = newIsEmailValid.filter((char) => char !== '.');
    }

    if (email.indexOf('@') < email.lastIndexOf('.')) {
        newIsEmailValid = newIsEmailValid.filter((char) => char !== 't');
    }

    return newIsEmailValid;
}

const  validatePassword = (password: string): number[] => {

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


//Funções assincronas

export async function handleSignup(name: string, email: string, password: string, remember: boolean): Promise<[boolean, any]> {

    //await new Promise(resolve => setTimeout(resolve, 3000));
    //return true;

    try {
        const data = {
            name: name,
            email: email,
            password: password,
            remember: remember
        };

        const response = await fetch(import.meta.env.VITE_ADDRESS + '/signup', {
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
            return [true, responseData];
        }
    } catch (err: any) {
        return [false, null];
    }
}

export async function handleLogin(email: string, password: string, remember: boolean): Promise<[boolean, any]> {
    try {
        const data = {
            email: email,
            password: password,
            remember: remember
        };
        console.log(JSON.stringify(data));


        const response = await fetch(import.meta.env.VITE_ADDRESS + '/login', {
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
            //NÃO, NÃO SOFRE
            return [true, responseData];
        }
    } catch (err: any) {
        return [false, err.message];

    }
}
 

// ^ LoginController
export async function handleGetUser(): Promise<profileInterface | null> {
    try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/profile/' + userId, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.profile;
        }
    } catch (err: any) {
        return null;
    }
}

//que eu saiba isso n faz nd
/*export async function handleChange(name: string, email: string): Promise<boolean> {
    try {
        const data = {
            name: name,
            email: email
        };

        const response = await fetch(import.meta.env.VITE_ADDRESS + '/user', {
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
}*/


export async function handleSaveChanges(profile: profileInterface): Promise<string | true> {// userController.ts
    try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/profile'+userId, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return true;
        }

    } catch (err: any) {
        return err.message;
    }
}

export async function handleLogout() {// userController.ts
    try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/logout/' + userId, {
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
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            sessionStorage.removeItem('userId');
            window.location.href = 'http://localhost:5173/';
            // return [true, "Logout bem sucedido"];
        }
    } catch (err: any) {
        return [false, "Logout falhou"];
    }

}
export async function handleDeleteAccount() { // userController.ts
    try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/profile/'+userId, {
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

        const responseLogout = await fetch(import.meta.env.VITE_ADDRESS + '/logout/'+userId, {
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

export async function handleGetArea_Profile(): Promise<area_ProfileInterface[] | null> { //profileController.ts
    try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/area_Profile/'+userId, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.areas_profile;
        }

    } catch (err: any) {
        return null;
    }
}

export async function handleIncrementAreas_Profile(areasAndAnswers: {[key: number]: {total_correct_answers: number, total_answers: number}}) {
    try {
        const userId = sessionStorage.getItem('userId');
        const data = {
            areasAndAnswers: areasAndAnswers
        };

        console.log(data);

        const response = await fetch(import.meta.env.VITE_ADDRESS + '/areas_Profile/increment/'+userId, {
            method: 'PUT',
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

export async function handleIncrementProfileMockTest() {
    try {
        const userID = sessionStorage.getItem('userId');
        const response = await fetch(import.meta.env.VITE_ADDRESS +'/profile/increment/mockTest/'+userID, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
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

export async function handleIncrementProfileAnswers(totalCorrectAnswers: number, totalAnswers: number) {
    try {
        const userID = sessionStorage.getItem('userId');
        const data = {
            total_correct_answers: totalCorrectAnswers,
            total_answers: totalAnswers
        };

        const response = await fetch(import.meta.env.VITE_ADDRESS + '/profile/increment/answers/'+userID, {
            method: 'PUT',
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

export {  validateEmail,  validatePassword }