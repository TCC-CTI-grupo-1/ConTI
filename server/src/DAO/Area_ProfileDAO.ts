import { ConnectionDAO } from "./ConnectionDAO";
import { Area_ProfileDTO } from "../DTO/Area_ProfileDTO";

const connectionDAO = new ConnectionDAO();

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
    
    listArea_ProfileByProfileId = async (profile_id: number) => {
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
}