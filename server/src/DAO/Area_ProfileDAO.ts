import { ConnectionDAO } from "./ConnectionDAO";
import { Area_ProfileDTO } from "../DTO/Area_ProfileDTO";
import { AreaDAO, AreaTree } from "./AreaDAO";
const connectionDAO = new ConnectionDAO();
export interface Rooted_AreaProfileTree{
    tree:{[key:number]:Area_ProfileDTO[]},
    root:Area_ProfileDTO
}
export type AreaProfileTree = {[key:number]:Area_ProfileDTO[]};


export class Area_ProfileDAO {
    registerArea_Profile = async (area_profile: Area_ProfileDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            const createdAreaProfile = await client.area_profile.create({
                data: {
                    area_id: area_profile.area_id,
                    profile_id: area_profile.profile_id,
                    total_correct_answers: area_profile.total_correct_answers,
                    total_answers: area_profile.total_answers
                }
            });
            return createdAreaProfile;
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('Área já cadastrada');
            }
        }
    }
    
    listArea_ProfileByProfileId = async (profile_id: number):Promise<Area_ProfileDTO[]>=> {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.area_profile.findMany({
                where: {
                    profile_id: profile_id
                }
            });

            const areas_profile: Area_ProfileDTO[] = [];

            result.forEach((result: any) => {
                const area_profile: Area_ProfileDTO = {
                    area_id: result.area_id,
                    profile_id: result.profile_id,
                    total_correct_answers: result.total_correct_answers,
                    total_answers: result.total_answers
                }
                areas_profile.push(area_profile);
            });

        return areas_profile;

        } catch (error) {
            throw error;
        }
    }

    buildAreaProfileTree = async(profile_id:number):Promise<AreaProfileTree> => {
        const instance = new AreaDAO();
        const areatree:AreaTree = await instance.buildAreaTree();
        let areaMap:{[key:number]:Area_ProfileDTO} = {};
        const areaProfileList = await this.listArea_ProfileByProfileId(profile_id);
        for(const area of areaProfileList)
        {
            areaMap[area.area_id] = area;
        }
        let tree:AreaProfileTree = {};
        for(const key in areatree)
        {
            const parent_id:number = Number(key);       
            for(const area of areatree[parent_id])
            {
                if(!tree[parent_id])
                {
                    tree[parent_id] = [];
                }
                tree[parent_id].push(areaMap[area.id]);
            }
        
        }
        return tree;
    }
    buildRootedAreaProfileTree = async(profile_id:number):Promise<Rooted_AreaProfileTree> => {
        const instance = new AreaDAO();
        const areatree:AreaTree = await instance.buildAreaTree();
        let areaMap:{[key:number]:Area_ProfileDTO} = {};
        const areaProfileList = await this.listArea_ProfileByProfileId(profile_id);
        let rank:{[key:number]:number} = {};
        for(const area of areaProfileList)
        {
            areaMap[area.area_id] = area;
        }
        let tree:AreaProfileTree = {};
        for(const key in areatree)
        {
            const parent_id:number = Number(key);       
            for(const area of areatree[parent_id])
            {
                if(!tree[parent_id])
                {
                    tree[parent_id] = [];
                }
                rank[area.id]++;
                tree[parent_id].push(areaMap[area.id]);
            }
        }
        let root = -1;
        for(const ad in rank)
        {
            const area_id = Number(ad);
            if(rank[area_id] === 0)
            {
                root = area_id;
                break;
            }
        }
        return {tree:tree, root:areaMap[root]};
    }


}