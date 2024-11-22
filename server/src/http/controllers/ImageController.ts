import { Request, Response } from "express";
import fs from 'fs';
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        cb(null, 'uploads/');
    },
    filename: function (req: Request, file: any, cb: any) {
        const questionID = req.body.questionID || req.query.questionID || req.params.questionID;
        const extension = file.originalname.split('.').pop();
        const name = file.originalname;
        cb(null, path.join(`${name}`));
    }
});

const upload = multer({ storage: storage });

export async function postImageController(req: Request, res: Response) {
    upload.single('image')(req, res, (err: any) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: 'Imagem enviada com sucesso' });
        }
    });
}

export async function deleteImageController(req: Request, res: Response) {
    const qstId = req.params.id;
    const path = 'uploads/' + qstId;
    fs.unlink(path, (err: any) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: 'Imagem deletada com sucesso' });
        }
    });
}