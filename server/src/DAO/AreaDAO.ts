import { ConnectionDAO } from "./ConnectionDAO";
import { AreaDTO } from "../DTO/AreaDTO";

const connectionDAO = new ConnectionDAO();
const CTI_ID:number = 0;

export type AreaTree = {[key:number]:AreaDTO[]};
export interface Rooted_AreaTree{
    tree:AreaTree,
    root:AreaDTO
}

export class AreaDAO {
    registerArea = async (area: AreaDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            const createdArea = await client.area.create({
                data: {
                    name: area.name,
                    parent_id: area.parent_id
                }
            });
            return createdArea;
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('Área já cadastrada');
            }
        }
    }

    listAreas = async (): Promise<AreaDTO[]> => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.area.findMany();

            const areas: AreaDTO[] = [];

            result.forEach((result: any) => {
                const area: AreaDTO = {
                    id: result.id,
                    name: result.name,
                    parent_id: result.parent_id
                }
                areas.push(area);
            });

            if (areas.length === 0) {
                throw new Error('Nenhuma área cadastrada');
            }

            return areas;

        } catch (error) {
            throw error;
        }

    }

    searchAreaById = async (id: number): Promise<AreaDTO> => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.area.findUnique({
                where: {
                    id: id
                }
            });
            if (result) {
                const areaDTO: AreaDTO = {
                    id: result.id,
                    name: result.name,
                    parent_id: result.parent_id
                }
                return areaDTO;
            } else {
                throw new Error('Área não encontrada');
            }
        } catch (error) {
            throw error;
        }
    }
    
    updateArea = async (area: AreaDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            const updatedArea = await client.area.update({
                where: {
                    id: area.id
                },
                data: {
                    name: area.name,
                    parent_id: area.parent_id
                }
            });
            return updatedArea;
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('Área já cadastrada');
            }
        }
    }

    deleteArea = async (id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const deletedArea = await client.area.delete({
                where: {
                    id: id
                }
            });
            return deletedArea;
        } catch (error) {
            throw error;
        }
    }

    listAreasByParentId = async (parent_id: number): Promise<AreaDTO[]> => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.area.findMany({
                where: {
                    parent_id: parent_id
                }
            });

            const areas: AreaDTO[] = [];

            result.forEach((result: any) => {
                const area: AreaDTO = {
                    id: result.id,
                    name: result.name,
                    parent_id: result.parent_id
                }
                areas.push(area);
            });

            return areas;
        } catch (error) {
            throw error;
        }
    }

    searchAreaByName = async (name: string): Promise<AreaDTO> => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.area.findFirst({
                where: {
                    name: name
                }
            });
            if (!result) {
                throw new Error('Área não encontrada');
            }
            return result as AreaDTO;
        } catch (error) {
            throw error;
        }
    }

    listAllSubAreasByParentId = async (parent_id: number): Promise<AreaDTO[]> => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.area.findMany({
                where: {
                    parent_id: parent_id
                }
            });

            const areas: AreaDTO[] = [];

            result.forEach((result: any) => {
                const area: AreaDTO = {
                    id: result.id,
                    name: result.name,
                    parent_id: result.parent_id
                }
                areas.push(area);
                this.listAllSubAreasByParentId(result.id).then((subAreas) => {
                    subAreas.forEach((subArea) => {
                        areas.push(subArea);
                    });
                });
            });

            return areas;

        } catch (error) {
            throw error;
        }
    }

    searchTopParentAreaById = async (id: number): Promise<AreaDTO> => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.area.findUnique({
                where: {
                    id: id
                }
            });
            if (result) {
                if (result.parent_id !== CTI_ID && result.parent_id) {
                    return this.searchTopParentAreaById(result.parent_id);
                } else {
                    return result as AreaDTO;
                }
            } else {
                throw new Error('Área não encontrada');
            }
        } catch (error) {
            throw error;
        }
    }

    listTopParentAreasByIds = async (ids: number[]): Promise<AreaDTO[]> => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.area.findMany({
                where: {
                    id: {
                        in: ids
                    }
                }
            });

            const areas: AreaDTO[] = [];

            result.forEach((result: any) => {
                this.searchTopParentAreaById(result.id).
                    then((area) => {
                        areas.push(area);
                    });
            });

            return areas;
        } catch (error) {
            throw error;
        }
    }

    buildAreaTree = async() :Promise<AreaTree> => {
        const instance = new AreaDAO();
        const areaList:AreaDTO[] = await instance.listAreas();
        let tree:AreaTree = {0:[]};
        for(const area of areaList)
        {
            if(area.parent_id!=null)
            if(tree[area.parent_id] !== undefined)
            {
                tree[area.parent_id].push(area);
            }
            else {
                tree[area.parent_id] = [];
                tree[area.parent_id].push(area);
            }
        }
        return tree;
    }
    buildRootedAreaTree = async() : Promise<Rooted_AreaTree> => {
        const instance = new AreaDAO();
        const areaList:AreaDTO[] = await instance.listAreas();
        let tree:AreaTree = {0:[]};
        let root:AreaDTO = {id:0, name:"root", parent_id:null};
        for(const area of areaList)
            {
                if(area.parent_id!==null && area.parent_id!==undefined)
                {
                    if(tree[area.parent_id] !== undefined)
                    {
                        tree[area.parent_id].push(area);
                    }
                    else {
                        tree[area.parent_id] = [];
                        tree[area.parent_id].push(area);
                    }
                }
                else {
                    root = area;
                }
            }
        return {tree:tree, root:root};
    }

    // listAreasWithoutSubAreas = async () => {
    //     try {
    //         const client = await connectionDAO.getConnection();
    //         const result = await client.area.findMany({
    //             where: {
    //                 parent_id: null
    //             }
    //         });

    //         const areas: AreaDTO[] = [];

    //         result.forEach((result: any) => {
    //             const area: AreaDTO = {
    //                 id: result.id,
    //                 name: result.name,
    //                 parent_id: result.parent_id
    //             }
                
    //         });

            
    //         return areas;

    //     } catch (error) {
    //         throw error;
    //     }
    // }

}