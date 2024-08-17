import {MockTestDTO} from "./server/src/DTO/MockTestDTO";
1
enum TestDifficulty{
    EASY,
    MEDIUM,
    HARD
};

enum DifficultyType{
    SUBJECT,INDIVIDUAL
}



interface ITestBlueprint{
    totalQuestions:number,
    questionBySubject:object,
    difficultyRating:TestDifficulty,
    difficultyType:DifficultyType
}

interface ITestBuilder{
    testBlueprint:TestBlueprint[] | undefined
}


class TestBlueprint implements ITestBlueprint{
    totalQuestions: number;
    questionBySubject: {[key:string]:number};
    difficultyRating: TestDifficulty;
    difficultyType: DifficultyType;
    constructor(totalQuestions=50,questionBySubject={"lingua_portuguesa":15,"matematica":15,"ciencias_biologicas":15,"ciencias_humanas":5},difficultyRating=TestDifficulty.MEDIUM,difficultyType=DifficultyType.INDIVIDUAL)
    {
        this.totalQuestions = totalQuestions;
        this.questionBySubject = questionBySubject;
        let totalSum = 0;
        for (const key in questionBySubject) {
            if (questionBySubject.hasOwnProperty(key)) {
                const value = questionBySubject[key];
                totalSum+=value;
            }
        }
        console.warn("Erro na construção da prova: Número de questoes por materia deve ser igual ao numero total");
        this.difficultyRating = difficultyRating;
        this.difficultyType = difficultyType;
    }
}

class TestBuilder{
    testBlueprint:TestBlueprint[] | undefined
    constructor(testBlueprint:TestBlueprint[] | undefined)
    {
        this.testBlueprint = testBlueprint;
    }

    buildTest(blueprint:TestBlueprint)
    {

    }
}

