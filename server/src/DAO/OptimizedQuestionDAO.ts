import { QuestionDTO } from "../DTO/QuestionDTO";
import { InvertedTree, questionFilters, RootedTree, Tree } from "../types/client/interfaces";
import { QuestionDAO } from "./QuestionDAO";
import { difficulty } from "@prisma/client";
import { AreaDTO } from "../DTO/AreaDTO";
import { AreaDAO, Rooted_AreaTree } from "./AreaDAO";
import { Area_ProfileDAO, Inverted_AreaProfileTree } from "./Area_ProfileDAO";
import { Area_ProfileDTO } from "../DTO/Area_ProfileDTO";

const assert = require('assert');
export class OptimizedQuestionDAO {
    hashedQuestionList: QuestionDTO[];
    hashedTree: RootedTree<AreaDTO>;
    hashedInvertedTree: InvertedTree<AreaDTO>;

    constructor() {
        this.hashedQuestionList = [];
        this.hashedTree = { tree: {}, root: { id: -1, name: "", parent_id: -1 } };
        this.hashedInvertedTree = {};
    }

    invertTree(tree: Tree<AreaDTO>, root: AreaDTO): InvertedTree<AreaDTO> {
        let inverted_tree: InvertedTree<AreaDTO> = {};
        for (const key in tree) {
            const parentid = Number(key);
            for (const child of tree[parentid]) {
                if (child.hasOwnProperty('id')) {
                    if (parentid === root.id) {
                        inverted_tree[child.id] = root;
                    } else {
                        inverted_tree[child.id] = inverted_tree[parentid];
                    }
                }
            }
        }
        return inverted_tree;
    }

    async initialize() {
        this.hashedQuestionList = await new QuestionDAO().listQuestions();
        this.hashedTree = await new AreaDAO().buildRootedAreaTree();
        this.hashedInvertedTree = this.invertTree(this.hashedTree.tree, this.hashedTree.root);
    }

    async optimizedGetQuestionList(): Promise<QuestionDTO[]> {
        if (this.hashedQuestionList.length > 0) {
            return this.hashedQuestionList;
        } else {
            const instance = new QuestionDAO();
            return this.hashedQuestionList = await instance.listQuestions();
        }
    }

    async optimizedGetFilteredQuestions(filters: questionFilters): Promise<QuestionDTO[]> {
        if (this.hashedQuestionList.length > 0) {
            return this.filter_question(filters, this.hashedQuestionList);
        } else {
            const instance = new QuestionDAO();
            return await instance.listQuestionByFilters(filters);
        }
    }

    optimizedListAllSubAreas(node: AreaDTO, tree: Tree<AreaDTO>): AreaDTO[] {
        let subareas: AreaDTO[] = [];
        if (tree[node.id]) {
            for (const child of tree[node.id]) {
                let retlist = this.optimizedListAllSubAreas(child, tree);
                subareas.push(...retlist);
            }
        }
        subareas.push(node);
        return subareas;
    }

    findNodeWithId(id: number, tree: Tree<AreaDTO>, node: AreaDTO): AreaDTO | null {
        if (node.id === id) {
            return node;
        } else {
            if (tree[node.id]) {
                for (const child of tree[node.id]) {
                    const ret = this.findNodeWithId(id, tree, child);
                    if (ret) {
                        return ret;
                    }
                }
            }
            return null;
        }
    }

    filter_question(filters: questionFilters, questionList: QuestionDTO[]): QuestionDTO[] {
        let subareas: number[] = [];
        let filteredQuestionList: QuestionDTO[] = [];

        if (filters.disciplina) {
            for (let i = 0; i < filters.disciplina.length; i++) {
                let retsub: AreaDTO[] = [];
                assert(typeof filters.disciplina[i] === "number");
                if (typeof filters.disciplina[i] === 'number') {
                    let node = this.findNodeWithId(filters.disciplina[i] as number, this.hashedTree.tree, this.hashedTree.root);
                    assert(node);
                    if (node) {
                        retsub = this.optimizedListAllSubAreas(node, this.hashedTree.tree);
                        for (const child of retsub) {
                            subareas.push(child.id);
                        }
                    }
                }
            }
        }

        for (const question of questionList) {
            if (filters.disciplina && !subareas.includes(question.area_id)) continue;
            if (filters.dificuldade && !filters.dificuldade.includes(question.difficulty)) continue;
            filteredQuestionList.push(question);
        }

        return filteredQuestionList;
    }
}