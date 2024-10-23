import {areaInterface} from './interfaces';

export async function handleGetAreas(): Promise<areaInterface[]> {
    try {
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/areas', {
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

export async function handleDeleteArea(id: number): Promise<boolean> {
    try {
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/area/' + id, {
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
            return true;
        }

    } catch (err: any) {
        return false;
    }
}

export async function handleGetTopParentAreasByIds(ids: number[]): Promise<areaInterface[]> {
    try {
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/areas/top' + JSON.stringify(ids), {
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

export async function handleGetAllParentAreasByIds(ids: number[]): Promise<areaInterface[]> {
    try {
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/areas/allparents/' + JSON.stringify(ids), {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.areas;
        }

    } catch (err: any) {
        return [];
    }
}

export async function handleGetAreasByQuestionsIds(questions_ids: number[]): Promise<number[]> {
    try {
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/areas/questions', {
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

export async function handleGetAreasMap(): Promise<{[id: number]: areaInterface}> {
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

import {areaTreeInterface} from './interfaces';

export async function handleGetAreasTree(): Promise<areaTreeInterface | null> { //areasController.ts
    try {
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/areas/tree', {
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
            return responseData;
        }

    } catch (err: any) {
        return null;
    }
}

export function getAreaPaiID(area: areaInterface, tree: areaInterface[]): number | null {
    //Encontra a area pai (area que tem parent id 0). ex, eu paso o id 1043, ele acha a area pai 1024, que, por sua vez, acha a area pai 1000, que acha a area pai 0, e portanto retorna 1000
    let areaFilha = area.id;
    let areaPai = area.parent_id;

    while(areaPai !== null && areaPai !== 0){
        const parent = tree.find((area) => area.id === areaPai);
        if(parent){
            areaPai = parent.parent_id;
            areaFilha = parent.id;
        }
        else{
            return null;
        }
    }
    return areaFilha;
} //areasController.ts

export function getAreaPaiID(area: areaInterface, tree: areaInterface[]): number | null {
    //Encontra a area pai (area que tem parent id 0). ex, eu paso o id 1043, ele acha a area pai 1024, que, por sua vez, acha a area pai 1000, que acha a area pai 0, e portanto retorna 1000
    let areaFilha = area.id;
    let areaPai = area.parent_id;

    while(areaPai !== null && areaPai !== 0){
        const parent = tree.find((area) => area.id === areaPai);
        if(parent){
            areaPai = parent.parent_id;
            areaFilha = parent.id;
        }
        else{
            return null;
        }
    }
    return areaFilha;
} //areasController.ts

export async function handlePostArea(nomeArea: string, areaPai: string | null): Promise<boolean>{
    try {        
        const data = {
            name: nomeArea,
            parent_id: areaPai
        };

        const response = await fetch(import.meta.env.VITE_ADDRESS + '/areas', {
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
