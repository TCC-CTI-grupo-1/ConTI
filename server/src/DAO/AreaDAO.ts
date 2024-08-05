import { ConnectionDAO } from "./ConnectionDAO";
import { AreaDTO } from "../DTO/AreaDTO";

const connectionDAO = new ConnectionDAO();

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

    listAreas = async () => {
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

    searchAreaById = async (id: number) => {
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
            await client.area.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    listAreasByParentId = async (parent_id: number) => {
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

    searchAreaByName = async (name: string) => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.area.findFirst({
                where: {
                    name: name
                }
            });
            if (result) {
                const areaDTO: AreaDTO = {
                    id: result.id,
                    name: result.name,
                    parent_id: result.parent_id
                }
                return areaDTO;
            }
        } catch (error) {
            throw error;
        }
    }

    listAllParentAreaIDs = async (areaId: number) => {
        try {
            const client = await connectionDAO.getConnection();
            let result = await client.area.findFirst({
                where: {
                    id: areaId
                }
            });

            const parentAreaIDs: number[] = [];
            let parent_id = result?.parent_id;

            while (parent_id) {
                parentAreaIDs.push(parent_id);
                result = await client.area.findFirst({
                    where: {
                        id: parent_id
                    }
                });
                parent_id = result?.parent_id;
            }
        } catch (error) {
            throw error;
        }
    }



}