import { AreaDAO } from "../../DAO/AreaDAO";
import { AreaDTO } from "../../DTO/AreaDTO";
import { Request, Response } from "express";

export async function deleteAreaController(req: Request, res: Response) {
    const id = req.params.id;
    const areaDAO = new AreaDAO();

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "ID deve ser um número" });
    }

    try {
        const areaDTO: AreaDTO = await areaDAO.deleteArea(Number(id));
        if (areaDTO) {
            return res.json({ response: areaDTO });
        } else {
            return res.status(404).json({ message: "Área não encontrada" });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}