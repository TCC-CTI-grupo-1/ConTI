import { AreaDAO } from "../../DAO/AreaDAO";
import { AreaDTO } from "../../DTO/AreaDTO";
import { Request, Response } from "express";

export async function getAreaController(req: Request, res: Response) {
    const areaDAO = new AreaDAO();
    try {
        const areas: AreaDTO[] = await areaDAO.listAreas();
        res.json({ areas: areas });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getTopParentAreaByIdController(req: Request, res: Response) {
    const id = req.params.id;
    const areaDAO = new AreaDAO();

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "ID deve ser um número" });
    }
    
    try {
        const area: AreaDTO = await areaDAO.searchTopParentAreaById(Number(req.params.id));
        res.json({ area: area });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}