import { difficulty } from "@prisma/client";


export interface questionFilters{
    ano?: number[];
    dificuldade?: difficulty[];
    disciplina?: string[]|number[];
    alreadyAnswered?: boolean;
}

export enum DifficultyLevel{
    EASY = 1,
    MEDIUM = 2,
    HARD = 3 ,
    MIMIC = 4,
    RANDOM = 5
};

export enum DifficultyType{
    AREA,INDIVIDUAL,SPECIAL
}