import { Client, ResultRow } from 'ts-postgres';

const cadastrarUsuario = async (client: Client, nome: string, email: string, senha: string) => {
    const result = await client.query(
        `INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING id`,
        [nome, email, senha]
    );
    return result.rows[0].get('id');
}

const atualizarUsuario = async (client: Client, id: number, nome: string, email: string, senha: string) => {
    await client.query(
        `UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4`,
        [nome, email, senha, id]
    );
}

const excluirUsuario = async (client: Client, id: number) => {
    await client.query(
        `DELETE FROM usuario WHERE id = $1`,
        [id]
    );
}

const listarUsuarios = async (client: Client) => {
    const result = await client.query('SELECT * FROM usuario');
    return result.rows.map((row: ResultRow<any>) => {
        return {
            id: row.get('id'),
            nome: row.get('nome'),
            email: row.get('email'),
            senha: row.get('senha'),
            foto_perfil: row.get('foto_perfil'),
            data_criacao: row.get('data_criacao')
        };
    });
}

const buscarUsuarioPorId = async (client: Client, id: number) => {
    const result = await client.query('SELECT * FROM usuario WHERE id = $1', [id]);
    const row = result.rows[0];
    return {
        id: row.get('id'),
        nome: row.get('nome'),
        email: row.get('email'),
        senha: row.get('senha'),
        foto_perfil: row.get('foto_perfil'),
        data_criacao: row.get('data_criacao')
    };
}