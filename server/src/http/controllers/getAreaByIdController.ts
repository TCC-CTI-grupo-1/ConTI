import { AreaDAO } from "../../DAO/AreaDAO";
import { AreaDTO } from "../../DTO/AreaDTO";
import { Request, Response } from "express";

export async function getAreaByIdController(req: Request, res: Response) {
    const id = req.params.id;
    const areaDAO = new AreaDAO();
    
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "ID deve ser um número" });
    }

    try {
        const area: AreaDTO = await areaDAO.searchAreaById(Number(id));
        if (area) {
            return res.json({ area: area });
        } else {
            return res.status(404).json({ message: "Área não encontrada" });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
