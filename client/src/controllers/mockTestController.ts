import { questionInterface, simuladoInterface} from './interfaces';
import { handleGetUser } from './userController';
export async function handleGetMockTestsByDateAndProfile(date: Date): Promise<simuladoInterface[]> { //mockTestController.ts
    try {
       // await new Promise(resolve => setTimeout(resolve, 500));
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/mockTests/date/' + date + '/' + userId, {
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
            return responseData.mockTests;
        }

    } catch (err: any) {
        return [];
    }

}


export async function handlePostSimulado(questionsList: questionInterface[], tipo: string, time_limit: number): Promise<simuladoInterface | null> { //mockTestController.ts
    //Código PLACEHOLDER.
    try {
        let name = "Simulado";
        if (tipo === 'automatico') {
            const profile = await handleGetUser();
            if (!profile) {
                return null;
            }
            name = "Simulado " + (profile.total_mock_tests + 1);
        }
        const dataForMockTest = {
            test_type: tipo,
            time_limit: time_limit,
            title: name
        };
        console.log(dataForMockTest);
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/mockTest/' + userId, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForMockTest)
        });

        const responseData = await response.json();
        console.log(responseData)
        const data = {
            mocktest_id: responseData.mockTest.id,
            questions: questionsList
        };

        const responseQuestions = await fetch(import.meta.env.VITE_ADDRESS + '/questions_MockTest', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseDataQuestions = await responseQuestions.json();

        if (!response.ok || !responseQuestions.ok) {
            throw new Error(responseData.message + ' ' + responseDataQuestions.message);
        } else {
            return responseData.mockTest;
        }
    } catch (err: any) {
        //console.log(err);   
        return null;
    }
}

//NN FEITO
export async function handleGetSimulado(): Promise<simuladoInterface | null> {//mockTestController.ts
    //Atenção, no backend checar se foi o usuario quem fez o simulado, se não foi retornar nulo.
    try {
        //await new Promise(resolve => setTimeout(resolve, 1000 * id/100));
        return null;
    } catch (err: any) {
        return null;
    }
}

//Atenção, a magica acontece aqui:

//Essa função parece muito errada

// não é 'generate', tá mais pra 'get'
export async function generateNewSimulado(): Promise<questionInterface[]>{ //mockTestController.ts
    try {        
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/questions/newMockTest/' + userId, {
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
            return responseData.questions;
        }
    }
    catch (err: any) {
        return err.message;
    }
}

export async function generateNewLista(materias:number[], nQuestoes: number) {
    try {        
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/questions/newMockList/' + userId +'/' + nQuestoes + '/' + JSON.stringify(materias), {
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
            return responseData.questions;
        }
    }
    catch (err: any) {
        return err.message;
    }
}

export async function handlePutSimulado(simulado: simuladoInterface): Promise<boolean> {//mockTestController.ts
    try {
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/mockTest/' + simulado.id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(simulado)
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