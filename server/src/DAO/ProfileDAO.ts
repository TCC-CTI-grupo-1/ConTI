import { ResultRow } from 'ts-postgres';
import { ConnectionDAO } from './ConnectionDAO';
import { ProfileDTO } from '../DTO/ProfileDTO';

const connectionDAO = new ConnectionDAO();

export class ProfileDAO {
  
    registerProfile = async (profile: ProfileDTO) => {
        const result = await connectionDAO.getConnection().query(
            `INSERT INTO profile (name, email, password, total_correct_answers, total_incorrect_answers) VALUES ($1, $2, $3, 0, 0) RETURNING id`,
            [profile.name, profile.email, profile.password]
        );
        return result.rows[0].get('id');
    }

    updateprofile = async (profile: ProfileDTO) => {
        await connectionDAO.getConnection().query(
            `UPDATE profile SET name = $1, email = $2, password = $3, total_correct_answers = $4, total_incorrect_answers = $5 WHERE id = $6`,
            [profile.name, profile.email, profile.password, profile.id, profile.total_correct_answers, profile.total_incorrect_answers]
        );
    }

    deleteprofile = async (profile: ProfileDTO) => {
        await connectionDAO.getConnection().query(
            `DELETE FROM profile WHERE id = $1`,
            [profile.id]
        );
    }

    listprofiles = async () => {
        const result = await connectionDAO.getConnection().query('SELECT * FROM profile');
        const profiles: ProfileDTO[] = result.rows.map((row: ResultRow<any>) => {
            return {
                id: row.get('id'),
                name: row.get('name'),
                email: row.get('email'),
                password: row.get('password'),
                profile_picture: row.get('profile_picture'),
                creation_date: row.get('creation_date'),
                total_correct_answers: row.get('total_correct_answers'),
                total_incorrect_answers: row.get('total_incorrect_answers')
            } as ProfileDTO;
        });
        return profiles;
    }

    searchprofileById = async (id: number) => {
        const result = await connectionDAO.getConnection().query('SELECT * FROM profile WHERE id = $1', [id]);
        const row = result.rows[0];
        const profile: ProfileDTO = {
            id: row.get('id'),
            name: row.get('name'),
            email: row.get('email'),
            password: row.get('password'),
            profile_picture: row.get('profile_picture'),
            creation_date: row.get('creation_date'),
            total_correct_answers: row.get('total_correct_answers'),
            total_incorrect_answers: row.get('total_incorrect_answers')
        };
        return profile;
    }
}