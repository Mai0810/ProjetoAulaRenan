export class Usuario {
    ID_USUARIO: number = null as unknown as number;
    NOME: string = null as unknown as string;
    EMAIL: string = null as unknown as string;
    SENHA: string = null as unknown as string;
    readonly ADMIN: number = 0;

    constructor(data?: any) {
        if (data) {
            this.ID_USUARIO = data?.ID_USUARIO;
            this.NOME = data.NOME;
            this.EMAIL = data.EMAIL;
            this.SENHA = data.SENHA;
            this.ADMIN = data?.ADMIN;
        }
    }

    public isAdmin(): boolean {
        if(this.ADMIN && this.ADMIN === 1){
            return true;
        }
        return false;
    } 
}