import { handleGetTopParentAreasByIds } from "./areasController";
import { area_ProfileInterface } from "./interfaces";

export async function handleIncrementAreas_ProfilesByAreasIds(areasIds: number[]): Promise<boolean> { //area_ProfileController.ts
    try {
        const userId = sessionStorage.getItem('userId');
        const parentAreasIds = await handleGetTopParentAreasByIds(areasIds);
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/areas_profiles/increment/'+userId, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ areasIds }),
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