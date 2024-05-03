import { ResultRow } from 'ts-postgres';
import { ConnectionDAO } from './ConnectionDAO';

const registerUser = async (connectionDAO: ConnectionDAO, user: UserDTO) => {
    const result = await connectionDAO.getConnection().query(
        `INSERT INTO user (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
        [user.name, user.email, user.password]
    );
    return result.rows[0].get('id');
}

const updateUser = async (connectionDAO: ConnectionDAO, user: UserDTO) => {
    await connectionDAO.getConnection().query(
        `UPDATE user SET name = $1, email = $2, password = $3 WHERE id = $4`,
        [user.name, user.email, user.password, user.id]
    );
}

const deleteUser = async (connectionDAO: ConnectionDAO, user: UserDTO) => {
    await connectionDAO.getConnection().query(
        `DELETE FROM user WHERE id = $1`,
        [user.id]
    );
}

const listUsers = async (connectionDAO: ConnectionDAO) => {
    const result = await connectionDAO.getConnection().query('SELECT * FROM user');
    const users: UserDTO[] = result.rows.map((row: ResultRow<any>) => {
        return {
            id: row.get('id'),
            name: row.get('name'),
            email: row.get('email'),
            password: row.get('password'),
            profile_picture: row.get('profile_picture'),
            creation_date: row.get('creation_date')
        } as UserDTO;
    });
    return users;
}

const searchUserById = async (connectionDAO: ConnectionDAO, id: number) => {
    const result = await connectionDAO.getConnection().query('SELECT * FROM user WHERE id = $1', [id]);
    const row = result.rows[0];
    const userDTO: UserDTO = {
        id: row.get('id'),
        name: row.get('name'),
        email: row.get('email'),
        password: row.get('password'),
        profile_picture: row.get('profile_picture'),
        creation_date: row.get('creation_date')
    };
    return userDTO;
}