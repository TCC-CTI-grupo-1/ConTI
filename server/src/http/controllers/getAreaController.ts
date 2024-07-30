import { AreaDAO } from "../../DAO/AreaDAO";
import { AreaDTO } from "../../DTO/AreaDTO";
import { Request, Response } from "express";

export async function getAreaController(req: Request, res: Response) {
    const areaDAO = new AreaDAO();
    try {
        const areas: AreaDTO[] = await areaDAO.listAreas();
        console.log(areas);
        res.json({ areas: areas });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}