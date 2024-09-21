import { difficulty } from "@prisma/client";


export interface questionFilters{
    ano?: number[];
    dificuldade?: difficulty[];
    disciplina?: string[]|number[];
    alreadyAnswered?: boolean;
}