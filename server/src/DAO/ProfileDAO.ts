import { ConnectionDAO } from './ConnectionDAO';
import { ProfileDTO } from '../DTO/ProfileDTO';
import { hashPassword, comparePasswords } from '../hidden/hidden';
import { throwDeprecation } from 'process';

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
                    total_incorrect_answers: profile.total_incorrect_answers
                }
            });
            return createdProfile;
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
                password: await hashPassword(profile.password),
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

        result.forEach((result: any) => {
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
            const profile = await this.searchprofileByEmail(email);
            const isPasswordCorrect = await comparePasswords(password, profile.password);

            if (isPasswordCorrect) {
                return profile;
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