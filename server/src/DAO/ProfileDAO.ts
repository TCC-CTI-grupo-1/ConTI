import { ConnectionDAO } from './ConnectionDAO';
import { ProfileDTO } from '../DTO/ProfileDTO';

const connectionDAO = new ConnectionDAO();

export class ProfileDAO {
  
    registerProfile = async (profile: ProfileDTO) => {  
        try {
            const client = await connectionDAO.getConnection();
            await client.profile.create({
            data: {
                name: profile.name,
                email: profile.email,
                password: profile.password,
                profile_picture: profile.profile_picture,
                creation_date: profile.creation_date,
                total_correct_answers: profile.total_correct_answers,
                total_incorrect_answers: profile.total_incorrect_answers
            }
        });
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('E-mail já cadastrado');
            }
        }
    }

    updateProfile = async (profile: ProfileDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.profile.update({
            where: {
                id: profile.id
            },
            data: {
                name: profile.name,
                email: profile.email,
                password: profile.password,
                profile_picture: profile.profile_picture,
                creation_date: profile.creation_date,
                total_correct_answers: profile.total_correct_answers,
                total_incorrect_answers: profile.total_incorrect_answers
            }
        });
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('Email já cadastrado');
            }
        }
    }

    deleteProfile = async (profile: ProfileDTO) => {
        const client = await connectionDAO.getConnection();
        await client.profile.delete({
            where: {
                id: profile.id
            }
        });
    }

    listProfiles = async () => {
        try {
        const client = await connectionDAO.getConnection();
        const result = await client.profile.findMany();
        
        const profiles: ProfileDTO[] = [];

        result.forEach((row: any) => {
            const profile: ProfileDTO = {
                id: row.id,
                name: row.name,
                email: row.email,
                password: row.password,
                profile_picture: row.profile_picture,
                creation_date: row.creation_date,
                total_correct_answers: row.total_correct_answers,
                total_incorrect_answers: row.total_incorrect_answers
            };
            profiles.push(profile);
        });

        return profiles;

        } catch (error) {
            throw error;
        }
    }

    searchprofileById = async (id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.profile.findUnique({
                where: {
                    id: id
                }
            });

            if (result) {
                const profile: ProfileDTO = {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    password: result.password,
                    profile_picture: result.profile_picture,
                    creation_date: result.creation_date,
                    total_correct_answers: result.total_correct_answers,
                    total_incorrect_answers: result.total_incorrect_answers
                };
                return profile;
            }
            else {
                throw new Error('Perfil não encontrado');
            }
        } catch (error) {
            throw error;
        }
    }

    searchprofileByEmail = async (email: string) => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.profile.findUnique({
                where: {
                    email: email
                }
            });

            if (result) {
                const profile: ProfileDTO = {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    password: result.password,
                    profile_picture: result.profile_picture,
                    creation_date: result.creation_date,
                    total_correct_answers: result.total_correct_answers,
                    total_incorrect_answers: result.total_incorrect_answers
                };
                return profile;
            }
            else {
                throw new Error('Perfil não encontrado');
            }

        } catch (error) {
            throw error;
        }
    }

    searchprofileByEmailAndPassword = async (email: string, password: string) => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.profile.findUnique({
                where: {
                    email: email,
                    password: password
                }
            });

            if (result) {
                const profile: ProfileDTO = {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    password: result.password,
                    profile_picture: result.profile_picture,
                    creation_date: result.creation_date,
                    total_correct_answers: result.total_correct_answers,
                    total_incorrect_answers: result.total_incorrect_answers
                };
                return profile;
            }
            else {
                throw new Error('Senha e/ou email incorretos');
            }
            
        } catch (error) {
            throw error;
        }
    }
}