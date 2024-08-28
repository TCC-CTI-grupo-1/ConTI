import { ConnectionDAO } from './ConnectionDAO';
import { ProfileDTO } from '../DTO/ProfileDTO';
import { hashPassword, comparePasswords } from '../hidden/hidden';

const connectionDAO = new ConnectionDAO();
export class ProfileDAO {
  
    registerProfile = async (profile: ProfileDTO) => {  
        try {
            const client = await connectionDAO.getConnection();
            const createdProfile = await client.profile.create({
                data: {
                    name: profile.name,
                    email: profile.email,
                    password: await hashPassword(profile.password),
                    profile_picture: profile.profile_picture,
                    creation_date: profile.creation_date,
                    total_correct_answers: profile.total_correct_answers,
                    total_answers: profile.total_answers
                }
            });
            return createdProfile;
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('E-mail já cadastrado');
            }
            throw error;
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
                password: await hashPassword(profile.password),
                profile_picture: profile.profile_picture,
                creation_date: profile.creation_date,
                total_correct_answers: profile.total_correct_answers,
                total_answers: profile.total_answers
            }
        });
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('Email já cadastrado');
            }
            throw error;
        }
    }

    updateProfileSession = async (profile: ProfileDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.profile.update({
            where: {
                id: profile.id
            },
            data: {
                name: profile.name,
                email: profile.email
            }
        });
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('Email já cadastrado');
            }
            throw error;
        }
    }

    deleteProfile = async (profile: ProfileDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.profile.delete({
                where: {
                    id: profile.id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    listProfiles = async () => {
        try {
        const client = await connectionDAO.getConnection();
        const result = await client.profile.findMany();
        
        const profiles: ProfileDTO[] = [];

        result.forEach((result: any) => {
            const profile: ProfileDTO = {
                id: result.id,
                name: result.name,
                email: result.email,
                password: result.password,
                profile_picture: result.profile_picture,
                creation_date: result.creation_date,
                total_correct_answers: result.total_correct_answers,
                total_answers: result.total_answers
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
            
            if (!result) {
                throw new Error('Perfil não encontrado');
            }
            return result as ProfileDTO;
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

            if (!result) {
                throw new Error('Perfil não encontrado');
            }
            return result as ProfileDTO;

        } catch (error) {
            throw error;
        }
    }

    searchprofileByEmailAndPassword = async (email: string, password: string) => {
        try {
            const profile = await this.searchprofileByEmail(email);
            const isPasswordCorrect = await comparePasswords(password, profile.password);

            if (isPasswordCorrect) {
                return profile as ProfileDTO;
            } else {
                throw new Error('Senha e/ou email incorretos');
            }
        } catch (error: any) {
            if (error.message === 'Perfil não encontrado') {
                throw new Error('Senha e/ou email incorretos');
            }
            throw error;
        }
    }
}