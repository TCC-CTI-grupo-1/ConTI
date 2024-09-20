import {ConnectionDAO} from "./DAO/ConnectionDAO";
import { QuestionDTO } from "./DTO/QuestionDTO";
import { Area_ProfileDTO } from "./DTO/Area_ProfileDTO";
import { AreaProfileTree, Area_ProfileDAO, Rooted_AreaProfileTree } from "./DAO/Area_ProfileDAO";
import { QuestionDAO } from "./DAO/QuestionDAO";
import { questionFilters } from "./types/client/interfaces";
import { difficulty as Difficulty , question } from "@prisma/client";
const conn = new ConnectionDAO();


enum DifficultyLevel{
    EASY = 1,
    MEDIUM = 2,
    HARD = 3 ,
    MIMIC = 4,
    RANDOM = 5
};

enum DifficultyType{
    AREA,INDIVIDUAL,SPECIAL
}
const buildProportions = function(...args:number[])
{
    return {
        easy: args[0],
        medium: args[1],
        hard: args[2]
    }
}
let difficultyProportions:{[key:number]:{[key:string]:number}};

difficultyProportions = {
    [DifficultyLevel.EASY] : buildProportions(3,2,1),
    [DifficultyLevel.MEDIUM] : buildProportions(1,1,1),
    [DifficultyLevel.HARD] : buildProportions(1,2,3)
}

const cond = function(a:number){return a<10}

const difficultyToErrorRatioCondition:{[key:string]:Function} = {
    easy : function(a:number,b:number){return (a+1) / (b+1) > 0.75 || cond(b)},
    medium : function(a:number,b:number){return (a+1) / (b+1) > 0.5 && (a+1)/(b+1) <=0.75 || cond(b)},
    hard : function(a:number,b:number){return (a+1) / (b+1) <=0.5 || cond(b)}
}

const classifyRatio = (a:number,b:number):string
{
    if(b<4) return "IRRELEVANT";    
    if(a/b > 0.75) return "easy";
    if(a/b > 0.5) return "medium";
    return "hard";
}
const difficultyToProportion = function(difficulty:DifficultyLevel){
    return difficultyProportions[difficulty];  
}

interface ITestBlueprint{
    totalQuestions:number,
    questionBySubject:{[key:string]:number},
    difficultyLevel:DifficultyLevel,
    difficultyType:DifficultyType
}

interface ITestBuilder{
    testBlueprint:TestBlueprint[] | undefined
}



const getTestProportions = async function(test:string)
{
    const client = await conn.getConnection();
    const rows = await client.question.findMany({
        where: {
            official_test_name: test
        }
    });
    type simpleMap = { [key:string|number]:number};
    const difficultyCount:simpleMap = {};
    const areaCount:simpleMap = {};
    const idToNameCache:{[key:number]:string} = {};
    let totalQuestions = 0;

    for(const row of rows)
    {
        totalQuestions++;
        if(!areaCount[row.area_id])
        {
            const name = await row.area_id;
            areaCount[name] = 1;
        }
        else {
            areaCount[idToNameCache[row.area_id]]++;
        }
        difficultyCount[row.difficulty]++;
    }
    const difficultyProportions:simpleMap = {};
    const areaProportions:simpleMap = {};
    const testProportions:{[key:string]:simpleMap} = {};
    for(const a in areaCount)
    {
        areaProportions[a] = areaCount[a]/rows.length;
    }
    for(const a in difficultyCount)
    {
        difficultyProportions[a] = difficultyCount[a]/rows.length;
    }
    testProportions['difficulty'] = difficultyProportions;
    testProportions['area'] = areaProportions;
    return testProportions;
}

const shuffle = function(array:any[])
{
    let count = array.length,
    randomnumber,
    temp;
    while( count ){
    randomnumber = Math.random() * count-- | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp
    }
}

const LINGUA_PORTUGUESA = 2;
const MATEMATICA = 1;
const CIENCIAS_HUMANAS = 4;
const CIENCIAS_DA_NATUREZA = 3;

interface AreaData
{
    questionCount_inDifficulty: {[key:string]:number}
}


export class TestBlueprint implements ITestBlueprint{
    totalQuestions: number;
    questionBySubject: {[key:number]:number};
    difficultyLevel: DifficultyLevel;
    difficultyType: DifficultyType;
    user_id:number;
    constructor(totalQuestions=50,questionBySubject={1:15,2:15,3:15,4:5},difficultyRating=DifficultyLevel.MEDIUM,difficultyType=DifficultyType.INDIVIDUAL,user_id:number)
    {
        this.totalQuestions = totalQuestions;
        this.questionBySubject = questionBySubject;
        let totalSum = 0;
        for (const key in questionBySubject) {
            const value = this.questionBySubject[Number(key)];
            totalSum+=value;
        }
        if(totalSum != totalQuestions) {
            console.error("Erro na construção da planta da prova: Número de questões por matéria deve ser igual ao número total");
        }
        this.difficultyLevel = difficultyRating;
        this.difficultyType = difficultyType;
        this.user_id = user_id;
    }
}
export class TestBuilder{
    testBlueprintList:TestBlueprint[] | undefined
    constructor(testBlueprint:TestBlueprint[] | undefined)
    {
        this.testBlueprintList = testBlueprint;
    }
    buildAll = () =>
    {
        if(this.testBlueprintList) {
            let listOfQuestionList = [{}] 
            for(const test of this.testBlueprintList){
                listOfQuestionList.push(this.buildTest(test));
            }
            return listOfQuestionList;
        }        
    }
    private buildSizeMap = (node:number, tree:AreaProfileTree, blueprint:TestBlueprint, size:number,sizeTree:{[key:number]:number}) => {
        sizeTree[node] = size;
        const numberOfNodes_inDifficulty:{[key:string]:number} = {};
        const totalNodes = tree[node].length;
        const proportions = difficultyToProportion(blueprint.difficultyLevel);
        for(const v of tree[node])
        {
            numberOfNodes_inDifficulty[classifyRatio(v.total_correct_answers,v.total_answers)] = sizeTree[v.area_id]++;
        }
        
        return sizeTree;
    }
    private getQuestionList = async(rooted_tree:Rooted_AreaProfileTree, testMap:{[key:number]:AreaData}):Promise<QuestionDTO[]> => 
    {
        let questionMap: {[key:number]:Boolean} = {};
        let questionList: QuestionDTO[] = [];
        const instance = new QuestionDAO();
        const tree = rooted_tree.tree;
        const dfs = async (node:Area_ProfileDTO):Promise<{[key:string]:number}> =>
        {
            let filter:questionFilters = {};
            let success:{[key:string]:number} = {};
            let children_success:{[key:string]:number} = {};
            if(tree[node.area_id] || tree[node.area_id].length !== 0) 
            {
                for(const v of tree[node.area_id]) 
                {
                    const values = await dfs(v);
                    for(const difficulty in values)
                    {
                        children_success[difficulty] += values[difficulty];
                    }
                }
            }
            const difficulties = Object.keys(testMap[node.area_id].questionCount_inDifficulty);
            const difficultyList = difficulties.filter(d => d !== "IRRELEVANT");
            if(!testMap[node.area_id].questionCount_inDifficulty["IRRELEVANT"]) testMap[node.area_id].questionCount_inDifficulty["IRRELEVANT"] = 0;
            difficultyList.push("IRRELEVANT");
            for(const difficulty of difficultyList)
            {
                const amount = testMap[node.area_id].questionCount_inDifficulty[difficulty] - children_success[difficulty];
                filter.disciplina = [node.area_id];
                let questions = await instance.listQuestionByFilters(filter);
                if(difficulty!=="IRRELEVANT")
                {
                    const filterQuery = function(r:QuestionDTO){return difficultyToErrorRatioCondition[difficulty](r.total_correct_answers,r.total_answers)};
                    questions = questions.filter(filterQuery);
                }
                shuffle(questions)
                let upperBound = amount;
                if(questions.length < amount)
                {
                    upperBound = questions.length;
                    if(difficulty!=="IRRELEVANT")
                    {
                        if(!testMap[node.area_id].questionCount_inDifficulty["IRRELEVANT"])
                        {
                            testMap[node.area_id].questionCount_inDifficulty["IRRELEVANT"] = amount-questions.length;
                        }
                        else
                            testMap[node.area_id].questionCount_inDifficulty["IRRELEVANT"] += amount-questions.length;
                    }
                }
                success[difficulty] = 0;
                for(let i = 0;i<upperBound;i++)
                {
                    if(i > questions.length-1) break;
                    if(!questionMap[questions[i].id])  {
                        questionList.push(questions[i])
                        questionMap[questions[i].id] = true;
                        success[difficulty]++;
                    }
                    else {
                        upperBound++;
                    }
                }
            }

            return success;
        }
        await dfs(rooted_tree.root);
        return questionList;
    } 

    buildTest = async(blueprint:TestBlueprint) => {
        const cacheID: {[key:number]:Boolean} = {};
        let questionList: { [key: number]: QuestionDTO[] } = {};
        const proportions = difficultyProportions[blueprint.difficultyLevel];
        let maxval = 0;
        for (const val in proportions) maxval+=proportions[val];
        const difficultyCountInSubject:{[key:number]:{[key:string]:number}} = {};
        for (const subject in blueprint.questionBySubject) {
            const nsubject = Number(subject);
            let numberOfQuestions = blueprint.questionBySubject[nsubject];
            if(blueprint.difficultyLevel === DifficultyLevel.RANDOM)
            {
                const client= await conn.getConnection();
                const row = await client.question.findMany({
                    where:{
                        area_id: nsubject
                    }
                });
                shuffle(row);
                questionList[nsubject] = []
                for(let i=0;i<numberOfQuestions;i++)
                {
                    if(!cacheID[row[i].id])
                    {
                        questionList[nsubject].push(row[i]);
                        cacheID[row[i].id] = true;
                    }
                    else{
                        numberOfQuestions++;
                    }
                }
            }
            
            if(blueprint.difficultyType === DifficultyType.INDIVIDUAL)
            {
                //Ou seja, a dificuldade é construída pela dificuldade individual das questões. Uma questão difícil sempre vai ser difícil
                
                    const questionCount = blueprint.questionBySubject[nsubject]
                    difficultyCountInSubject[nsubject] = {}
                    questionList[nsubject] = []
                    for (const proportion in proportions)
                    {
                        if(proportion == "medium")
                        {
                            difficultyCountInSubject[nsubject][proportion] = Math.ceil(questionCount - Math.floor(questionCount * proportions['easy'] /maxval) - Math.floor(questionCount * proportions['hard'] / maxval))
                        }
                        else
                            difficultyCountInSubject[nsubject][proportion] = Math.floor(proportions[proportion] * questionCount / maxval)
                    }
                    
                    for (const difficulty in difficultyCountInSubject[nsubject])
                    {
                        const client = await conn.getConnection();
                        
                        const rows = await client.question.findMany({
                            where:{    
                                area_id: nsubject
                            }
                        });
                        
                        const filterQuery = function(r:any){ return difficultyToErrorRatioCondition[difficulty](r.total_correct_answers,r.total_answers)}; 
                        const row = rows.filter(filterQuery);                        
                        shuffle(row);
                        
                        for(let i=0;i<difficultyCountInSubject[nsubject][difficulty];i++)
                        {
                            if(cacheID[row[i].id]) {
                                difficultyCountInSubject[nsubject][difficulty]++;
                                continue;
                            }
                            questionList[nsubject].push(row[i]);
                            cacheID[row[i].id] = true;
                        }
                    }
                   
            }
            if(blueprint.difficultyType === DifficultyType.AREA)
            {   
                const instance = new Area_ProfileDAO();
                const tree = await instance.buildRootedAreaProfileTree(blueprint.user_id);
                const sizeMap = this.buildSizeMap(1,tree.tree,blueprint,blueprint.totalQuestions,{});

            }
            if(blueprint.difficultyLevel === DifficultyLevel.MIMIC)
            {
                console.warn("Não implementado")
                //A ideia disso é imitar a forma das provas do CTI: a proporção de questões fáceis/médias/difíceis e 
                //o número de áreas.
            }
        }

        let i = 0;
        const questionDTOList: QuestionDTO[] = [];
        for (const subject in questionList) {
            const nsubject = Number(subject);
            const questions = questionList[nsubject];
            for (const question of questions) {
                questionDTOList.push(question as QuestionDTO);
            }
            ++i
        }
        return questionDTOList;
    }
}

