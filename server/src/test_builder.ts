import {ConnectionDAO} from "./DAO/ConnectionDAO";
import { QuestionDTO } from "./DTO/QuestionDTO";
import { Area_ProfileDTO } from "./DTO/Area_ProfileDTO";
import { AreaProfileTree, Area_ProfileDAO, Rooted_AreaProfileTree } from "./DAO/Area_ProfileDAO";
import { QuestionDAO } from "./DAO/QuestionDAO";
import { questionFilters } from "./types/client/interfaces";
import { difficulty as Difficulty , question } from "@prisma/client";
import internal from "stream";
const conn = new ConnectionDAO();


export enum DifficultyLevel{
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
    MIMIC = "mimic",
    IRRELEVANT = "irrelevant"
};

export enum DifficultyType{
    AREA = 1,
    INDIVIDUAL = 2
}




class ProportionHandler {
    private buildProportions = function(...args:number[]){
        const retobj:{[key:string]:number} = {};
        retobj[DifficultyLevel.EASY] = args[0];
        retobj[DifficultyLevel.MEDIUM] = args[1];
        retobj[DifficultyLevel.HARD] = args[2];
        return retobj;
    }
    difficultyToProportions = (difficulty:string):{[key:string]:number} => {
        if(difficulty === DifficultyLevel.EASY) return this.buildProportions(3,2,1);
        if(difficulty === DifficultyLevel.HARD) return this.buildProportions(1,2,3);
        return this.buildProportions(1,1,1);
    }

    classifyRatio = (a:number,b:number):string =>
    {
        if(b<4) return DifficultyLevel.IRRELEVANT    
        if(a/b > 0.75) return DifficultyLevel.EASY;
        if(a/b > 0.5) return DifficultyLevel.MEDIUM;
        return DifficultyLevel.HARD;
    }
    private difficultyToAreaDifficulty = (difficulty:string):string => {
        if(difficulty === DifficultyLevel.EASY) return DifficultyLevel.HARD;
        if(difficulty === DifficultyLevel.HARD) return DifficultyLevel.EASY;
        return difficulty;
    }
    classifyAreaRatio = (a:number,b:number):string =>{
        return this.difficultyToAreaDifficulty(this.classifyRatio(a,b));
    }
    proportionToFraction = (proportion:{[key:string]:number}) =>{
    const fractions:{[key:string]:number} = {};
    let total = 0;
    for(const key in proportion)
    {
        total+=proportion[key];
    }
    for(const key in proportion)
    {
        fractions[key] = proportion[key]/total;
    }
    return fractions;
    }
    difficultyToRatioCondition = (difficulty:string) => {
        const innerFunc = function(val:number) {return val<=3;}
        const trueFunc = function(a:number,b:number){return true;}
        if(difficulty === DifficultyLevel.EASY) return function(a:number,b:number){return innerFunc(b)? true : a/b > 0.75};
        if(difficulty === DifficultyLevel.HARD) return function(a:number,b:number){return innerFunc(b)? true : a/b <= 0.5};
        if(difficulty === DifficultyLevel.MEDIUM) return function(a:number,b:number){return innerFunc(b)? true : a/b > 0.5 && a/b <= 0.75};
        return trueFunc;
    }
}

interface ITestBlueprint{
    totalQuestions:number,
    questionsInArea:{[key:string]:number},
    difficulty:{[difficulty_type:number]:DifficultyLevel}
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
    questionsInArea: {[key:number]:number};
    difficulty:{[difficulty_type:number]:DifficultyLevel}
    user_id:number;
    constructor(totalQuestions=50,questionsInArea={1:15,2:15,3:15,4:5},difficulty:{1:DifficultyLevel.MEDIUM,2:DifficultyLevel.MEDIUM},user_id:number)
    {
        this.totalQuestions = totalQuestions;
        this.questionsInArea = questionsInArea;
        this.difficulty = difficulty;
        let totalSum = 0;
        for (const key in questionsInArea) {
            const value = this.questionsInArea[Number(key)];
            totalSum+=value;
        }
        if(totalSum != totalQuestions) {
            console.error("Erro na construção da planta da prova: Número de questões por matéria deve ser igual ao número total");
        }
        this.user_id = user_id;
    }
}
export class TestBuilder{
    testBlueprintList:TestBlueprint[] | undefined
    helper:ProportionHandler = new ProportionHandler();
    constructor(testBlueprint:TestBlueprint[] | undefined)
    {
        this.testBlueprintList = testBlueprint;
        this.helper = new ProportionHandler();
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
    private buildSizeMap = async(rooted_tree:Rooted_AreaProfileTree, blueprint:TestBlueprint):Promise<{[key:number]:AreaData}>=>{
        let sizeMap:{[key:number]:AreaData} = {};
        let questionsInArea = blueprint.questionsInArea;
        let marked:{[key:string]:boolean} = {};
        for(const key in questionsInArea)
        {
            marked[key] = true;
        }
        const tree = rooted_tree.tree;
        const root = rooted_tree.root;
        const instance = new Area_ProfileDAO();
        const inverted_tree = await instance.buildInverted_AreaProfileTree(root.area_id);
        const fractionInType:{[key:number]:{[key:string]:number}} = {};
        for(const type in blueprint.difficulty)
        {
            fractionInType[type] = this.helper.proportionToFraction(this.helper.difficultyToProportions(blueprint.difficulty[type]));
        }
        const normalizeValues = (node:number,sender:number) => {
            if(marked[node] && node != sender) return;
            questionsInArea[node] +=questionsInArea[sender];
            normalizeValues(inverted_tree[node].area_id,sender);
        }
        for(const value in questionsInArea)
        {
            const key = Number(value);
            normalizeValues(key,key);
        }
        const produtoria = (lista:number[]) => {
            let ret = 1;
            for(const v of lista)
            {
                ret*=v;
            }
            return ret;
        }
        const produt_sum = (lista:number[]) => {
            let produt = produtoria(lista);
            let sum = 0;
            for(const v of lista)
            {
                sum+=produt/v;
            }
            return sum;
        }
        const normalizeList = (lista: number[]): number[] => {
            return lista.map(num => num === 0 ? 0.001 : num);
        }
        const queue:Area_ProfileDTO[] = [];
        queue.push(root);
        while(queue.length!==0)
        {
            const parent = queue.shift();
            if(!parent) break;
            for(const child of tree[parent.area_id])
            {
                queue.push(child);
            }
            const difflist:{[key:string]:number[]} = {};
            const idlist:{[key:string]:number[]} = {};
            let questionsInChildren = 0;
            for(const child of queue)
            {
                const difficulty = this.helper.classifyAreaRatio(child.total_correct_answers,child.total_answers);
                difflist[difficulty].push(child.total_answers===0? 0.001 : child.total_correct_answers/child.total_answers);
                idlist[difficulty].push(child.area_id);
                questionsInChildren += questionsInArea[child.area_id];
            }
            for(const diff in difflist)
            {
                const list = normalizeList(difflist[diff]);
                const k = produt_sum(list)/produtoria(list);
                let sumSoFar = 0;
                const n = fractionInType[DifficultyType.AREA][diff] * (questionsInArea[parent.area_id] - questionsInChildren);
                for(let i=0;i<list.length;i++)
                {
                    const val = Math.floor(n/(k*list[i]));
                    sizeMap[idlist[diff][i]].questionCount_inDifficulty[diff] = Math.floor(val);
                    sumSoFar += val;
                }
                sizeMap[idlist[diff][0]].questionCount_inDifficulty[diff]+= n-sumSoFar;
            }
        }
        return sizeMap;
    }
    private getQuestionList = async(rooted_tree:Rooted_AreaProfileTree, testMap:{[key:number]:AreaData}):Promise<QuestionDTO[]> => 
    {
        let questionMap: {[key:number]:Boolean} = {};
        let questionList: QuestionDTO[] = [];
        const instance = new QuestionDAO();
        const tree = rooted_tree.tree;
        const helper = this.helper;
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
            const difficultyList = difficulties.filter(d => d !== DifficultyLevel.IRRELEVANT);
            if(!testMap[node.area_id].questionCount_inDifficulty[DifficultyLevel.IRRELEVANT]) testMap[node.area_id].questionCount_inDifficulty[DifficultyLevel.IRRELEVANT] = 0;
            difficultyList.push(DifficultyLevel.IRRELEVANT);
            for(const difficulty of difficultyList)
            {
                const amount = testMap[node.area_id].questionCount_inDifficulty[difficulty] - children_success[difficulty];
                filter.disciplina = [node.area_id];
                let questions = await instance.listQuestionByFilters(filter);
                if(difficulty!==DifficultyLevel.IRRELEVANT)
                {
                    const filterQuery = function(r:QuestionDTO){return helper.difficultyToRatioCondition(difficulty)(r.total_correct_answers,r.total_answers)};
                    questions = questions.filter(filterQuery);
                }
                shuffle(questions)
                let upperBound = amount;
                if(questions.length < amount)
                {
                    upperBound = questions.length;
                    if(difficulty!==DifficultyLevel.IRRELEVANT)
                    {
                        if(!testMap[node.area_id].questionCount_inDifficulty[DifficultyLevel.IRRELEVANT])
                        {
                            testMap[node.area_id].questionCount_inDifficulty[DifficultyLevel.IRRELEVANT] = amount-questions.length;
                        }
                        else
                            testMap[node.area_id].questionCount_inDifficulty[DifficultyLevel.IRRELEVANT] += amount-questions.length;
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

    buildTest = async(blueprint:TestBlueprint):Promise<QuestionDTO[]> => {
        const instance = new Area_ProfileDAO();
        const rooted_tree = await instance.buildRootedAreaProfileTree(blueprint.user_id);
        const sizeMap = await this.buildSizeMap(rooted_tree,blueprint);
        const questionList = await this.getQuestionList(rooted_tree,sizeMap);
        return questionList;
    }
}
