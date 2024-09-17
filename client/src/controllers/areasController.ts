import {areaInterface} from './interfaces';

export async function handleGetAreas(): Promise<areaInterface[]> { //areasController.ts
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/areas', {
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
            return responseData.areas;
        }

    } catch (err: any) {
        return [];
    }
}

export async function handleGetTopParentAreasByIds(ids: number[]): Promise<areaInterface[]> { //areasController.ts
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/areas/top' + JSON.stringify(ids), {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.areas;
        }

    } catch (err: any) {
        return [];
    }
}

export async function handleGetAreasByQuestionsIds(questions_ids: number[]): Promise<number[]> { //areasController.ts
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/areas/questions', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questions_ids),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.areas;
        }

    } catch (err: any) {
        return [];
    }
}

//Função que executa handleGetAreas e transforma em um hashMap [id] => area

export async function handleGetAreasMap(): Promise<{[id: number]: areaInterface}> { //areasController.ts
    try{
        const areas = await handleGetAreas();
        if(areas.length === 0){
            throw new Error('Erro ao pegar areas');
        }
        let areasMap: {[id: number]: areaInterface} = {};
        areas.forEach((area) => {
            areasMap[area.id] = area;
        });
        return areasMap;
    }
    catch(err: any){
        return {};
    }
}

export async function handlePostArea(nomeArea: string, areaPai: string | null): Promise<boolean>{ //areasController.ts
    try {        
        await new Promise(resolve => setTimeout(resolve, 3000));
        const data = {
            name: nomeArea,
            parent: areaPai
        };

        const response = await fetch('http://localhost:3001/areas', {
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
            return true;
        }

    } catch (err: any) {
        return false;
    }
}
