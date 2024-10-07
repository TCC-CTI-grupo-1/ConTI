import { Request, Response } from 'express';
import { AreaDAO } from '../../DAO/AreaDAO';
import { AreaDTO } from '../../DTO/AreaDTO';


export async function postAreaController(req: Request, res: Response) {
    const areaDAO = new AreaDAO();
    try {
		req.body.parent_id = Number(req.body.parent_id);
        await areaDAO.registerArea(req.body as areaDTO);
        res.status(201).json({ message: 'Área cadastrada com sucesso' });
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}