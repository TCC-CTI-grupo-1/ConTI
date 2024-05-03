import { Client, ResultRow } from 'ts-postgres';

const registerUser = async (client: Client, user: UserDTO) => {
    const result = await client.query(
        `INSERT INTO user (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
        [user.name, user.email, user.password]
    );
    return result.rows[0].get('id');
}

const updateUser = async (client: Client, user: UserDTO) => {
    await client.query(
        `UPDATE user SET name = $1, email = $2, password = $3 WHERE id = $4`,
        [user.name, user.email, user.password, user.id]
    );
}

const deleteUser = async (client: Client, user: UserDTO) => {
    await client.query(
        `DELETE FROM user WHERE id = $1`,
        [user.id]
    );
}

const listUsers = async (client: Client) => {
    const result = await client.query('SELECT * FROM user');
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

const searchUserById = async (client: Client, user: UserDTO) => {
    const result = await client.query('SELECT * FROM user WHERE id = $1', [user.id]);
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