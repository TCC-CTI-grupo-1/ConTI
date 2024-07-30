import { Request, Response } from 'express';
import { AreaDAO } from '../../DAO/AreaDAO';

export async function setAreaController(req: Request, res: Response) {
    const areaDAO = new AreaDAO();
    try {
        await areaDAO.registerArea(req.body);
        res.status(201).json({ message: 'Área cadastrada com sucesso' });
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}