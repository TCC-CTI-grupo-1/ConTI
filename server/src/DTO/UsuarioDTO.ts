class UsuarioDTO {
    id: number;
    nome: string;
    email: string;
    senha: string;
    foto_perfil: string;
    data_criacao: Date;

    constructor(id: number, nome: string, email: string, senha: string, foto_perfil: string, data_criacao: Date) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.foto_perfil = foto_perfil;
        this.data_criacao = data_criacao;
    }
}