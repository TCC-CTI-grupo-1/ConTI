import { Profile } from '../../../server/src/types/express-session';
import { questionInterface, simuladoSimpleInterface, simuladoInterface } from './interfaces';
import { questionFilters } from './interfaces';

const validadeEmail = (email: string): string[] => { //Deveria mudar string[] para uma interface??
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


//Funções assincronas

export async function handleSignup(name: string, email: string, password: string, remember: boolean): Promise<string | null> {

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

export async function handleLogin(email: string, password: string, remember: boolean): Promise<[boolean, string]> {
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

export async function handleGetUser(): Promise<Profile | null> {
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
    } catch (err: any) {
        return null;
    }
}

export async function handleChange(name: string, email: string): Promise<boolean> {
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


export async function handleSaveChanges(Profile: Profile): Promise<string | true> {
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
        return err.message;
    }
}

export async function handleLogout() {
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
export async function handleDeleteAccount() {
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

export async function handleGetQuestion(questionID: number): Promise<questionInterface> {
    //Fazer um timeout de 300ms:
    
    if (questionID % 2 === 0) {
        return {
            id: questionID * 100,
            subject: {
                name: 'Matemática',
                sub: {
                    name: 'Álgebra',
                    sub: {
                        name: 'Equações'
                    }
                }
            },
            difficulty: 'easy',
            year: 2021,
            enunciado: 'Qual é a raiz quadrada de 49?',
            alternativas: ['1', '7', '9', '5', '49'],
            alternativaCorreta: 'a'
        };
    } else {
        return {
            id: questionID * 100,
            subject: {
                name: 'Português',
                sub: {
                    name: 'Gramática',
                    sub: {
                        name: 'Sintaxe'
                    }
                }
            },
            difficulty: 'medium',
            year: 2021,
            enunciado: 'TesteDaPrimeiraLinha:11111111111111111111111111111111111111111111111111111 '+
            'SegundaLinha:222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
            alternativas: ['Triste', 'Feliz', 'Sério', 'Bravo', 'L'],
            alternativaCorreta: 'B'
        };
    }

}

export async function handleGetQuestions(filters: questionFilters): Promise<questionInterface[]> {
    await new Promise(resolve => setTimeout(resolve, 10));
    return [
        {
            id: 1,
            subject: {
                name: 'Matemática',
                sub: {
                    name: 'Álgebra',
                    sub: {
                        name: 'Equações'
                    }
                }
            },
            difficulty: 'easy',
            year: 2021,
            enunciado: 'Qual é a raiz quadrada de 49?',
            alternativas: ['1', '7', '9', '5', '49'],
            alternativaCorreta: 'a'
        },
        {
            id: 2,
            subject: {
                name: 'Português',
                sub: {
                    name: 'Gramática',
                    sub: {
                        name: 'Sintaxe'
                    }
                }
            },
            difficulty: 'medium',
            year: 2021,
            enunciado: 'Qual é a raiz quadrada de 49?',
            alternativas: ['Triste', 'Feliz', 'Sério', 'Bravo', 'L'],
            alternativaCorreta: 'b'
        },
        {
            id: 3,
            subject: {
                name: 'Matemática',
                sub: {
                    name: 'Álgebra',
                    sub: {
                        name: 'Equações'
                    }
                }
            },
            difficulty: 'hard',
            year: 2021,
            enunciado: 'Qual é a raiz quadrada de 49?',
            alternativas: ['1', '7', '9', '5', '49'],
            alternativaCorreta: 'c'
        },
        {
            id: 4,
            subject: {
                name: 'Português',
                sub: {
                    name: 'Gramática',
                    sub: {
                        name: 'Sintaxe'
                    }
                }
            },
            difficulty: 'hard',
            year: 2021,
            enunciado: 'Qual é a raiz quadrada de 49?',
            alternativas: ['Triste', 'Feliz', 'Sério', 'Bravo', 'L'],
            alternativaCorreta: 'd'
        }
    ];
}

export async function handleGetSimpleSimulados(data: Date): Promise<simuladoSimpleInterface[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
        {
            id: 1,
            totalQuestions: 10,
            totalCorrect: 7,
            date: new Date(2021, 4, 1),
            time: 60,
            subjects: {
                'Matemática': {
                    totalQuestions: 5,
                    totalCorrect: 4
                },
                'Português': {
                    totalQuestions: 5,
                    totalCorrect: 4
                },
                'Ciencias': {
                    totalQuestions: 5,
                    totalCorrect: 2
                },
                'História': {
                    totalQuestions: 5,
                    totalCorrect: 3
                }
                
            }
        },
        {
            id: 2,
            totalQuestions: 10,
            totalCorrect: 8,
            date: new Date(2021, 4, 1),
            time: 60,
            subjects: {
                'Matemática': {
                    totalQuestions: 5,
                    totalCorrect: 4
                },
                'Português': {
                    totalQuestions: 5,
                    totalCorrect: 4
                }
            }
        },
        {
            id: 3,
            totalQuestions: 10,
            totalCorrect: 8,
            date: new Date(2021, 4, 1),
            time: 60,
            subjects: {
                'Matemática': {
                    totalQuestions: 5,
                    totalCorrect: 4
                },
                'Português': {
                    totalQuestions: 5,
                    totalCorrect: 4
                }
            }
        }
    ];

}

type questionMapInterface = questionInterface[];
//ID e Alternativa (O index é o número da questão na prova.)
type questionMapResultInterface = [number, (string | null)][];  

//Retorna o simulado que foi adicionado
export async function handlePostSimulado(questionsList: questionMapResultInterface): Promise<simuladoSimpleInterface | null> {
    //Código PLACEHOLDER.
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return {
            id: 1,
            totalQuestions: 10,
            totalCorrect: 7,
            date: new Date(2021, 4, 1),
            time: 60,
            subjects: {
                'Matemática': {
                    totalQuestions: 5,
                    totalCorrect: 4
                },
                'Português': {
                    totalQuestions: 5,
                    totalCorrect: 4
                }
            }
        }
    } catch (err: any) {
        return null;
    }
}

export async function handleGetSimulado(id: number): Promise<simuladoInterface | null> {
    //Atenção, no backend checar se foi o usuario quem fez o simulado, se não foi retornar nulo.
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return {
            id: 1,
            questions: 
            [
                [1, 'A'],
                [2, 'B'],
                [3, 'C'],
                [4, 'D'],
                [5, 'E'],
                [6, 'A'],
                [7, 'B'],
                [8, 'C'],
                [9, 'D'],
                [10, 'E']
            ],
            date: new Date(2021, 4, 1),
            time: 60
        }
    } catch (err: any) {
        return null;
    }
}

//Atenção, a magica acontece aqui:

export async function generateNewSimulado(): Promise<string>{
    await new Promise(resolve => setTimeout(resolve, 3000));
    //UID do simulado (talvez não vamos usar, ai retorne booleano)
    return '34ghGTH33EDWF@#wfdw';
}


export { validadeEmail, validadePassword }