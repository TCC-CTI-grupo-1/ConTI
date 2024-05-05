import { ResultRow, connect } from 'ts-postgres';
import { ConnectionDAO } from './ConnectionDAO';
import { ProfileDTO } from '../DTO/ProfileDTO';

const connectionDAO = new ConnectionDAO();

export class ProfileDAO {
  
    registerProfile = async (profile: ProfileDTO) => {
        const client = await connectionDAO.getConnection();
        const result = client.query(
            `INSERT INTO profile (name, email, password, profile_picture, creation_date, total_correct_answers, total_incorrect_answers) VALUES ($1, $2, $3, null, NOW(), 0, 0) RETURNING id`,
            [profile.name, profile.email, profile.password]
        );
        return result;
    }

    updateprofile = async (profile: ProfileDTO) => {
        const client = await connectionDAO.getConnection();
        client.query(
            `UPDATE profile SET name = $1, email = $2, password = $3, total_correct_answers = $4, total_incorrect_answers = $5 WHERE id = $6`,
            [profile.name, profile.email, profile.password, profile.id, profile.total_correct_answers, profile.total_incorrect_answers]
        );
    }

    deleteprofile = async (profile: ProfileDTO) => {
        const client = await connectionDAO.getConnection();
        client.query(
            `DELETE FROM profile WHERE id = $1`,
            [profile.id]
        );
    }

    listprofiles = async () => {
        
        const client = await connectionDAO.getConnection();
        const result = await client.query('SELECT * FROM profile');

        const profiles: ProfileDTO[] = [];
        for await (const row of result) {
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
            profiles.push(profile);
        }
        return profiles;
    }

    searchprofileById = async (id: number) => {
        const client = await connectionDAO.getConnection();
        const result = await client.query('SELECT * FROM profile WHERE id = $1', [id]);
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