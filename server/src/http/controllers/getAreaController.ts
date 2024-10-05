import { AreaDAO } from "../../DAO/AreaDAO";
import { AreaDTO } from "../../DTO/AreaDTO";
import { QuestionDAO } from "../../DAO/QuestionDAO";
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

export async function getAreaIdByQuestionIdController(req: Request, res: Response) {
    const question_id = req.params.question_id;
    const questionDAO = new QuestionDAO();
    
    if (isNaN(Number(question_id))) {
        return res.status(400).json({ message: "ID deve ser um número" });
    }

    try {
        const area_id: number = await questionDAO.searchAreaIdByQuestionId(Number(question_id));
        res.json({ area_id: area_id });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAreasIdsByQuestionsIdsController(req: Request, res: Response) {
    console.log("sddawa")
    const questions_ids = JSON.parse(req.body.questions_ids) as number[];
    const questionDAO = new QuestionDAO();
    
    try {
        const areas_ids: number[] = await questionDAO.listAreasIdsByQuestionsIds(questions_ids);
        res.json({ areas_ids: areas_ids });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAreaTreeController(req: Request, res: Response) {
    const areaDAO = new AreaDAO();
    try {
        const areaTree = await areaDAO.buildRootedAreaTree();
        res.json({ areaTree: areaTree });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}