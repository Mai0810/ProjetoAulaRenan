import { Usuario } from "./usuario.model";

export class Produtor extends Usuario {
    DESCRICAO: string = null as unknown as string;
    ENDERECO: string = null as unknown as string;
    TELEFONE: string = null as unknown as string;
    ID_PRODUTOR:number = null as unknown as number;

    constructor(data?: any) { 
        super({
            "ID_USUARIO":data?.ID_USUARIO,
            "NOME":data.NOME,
            "EMAIL":data.EMAIL,
            "SENHA":data.SENHA
        });
        if (data) { 
            
            this.ID_PRODUTOR = data.ID_PRODUTOR;
            this.DESCRICAO = data.DESCRICAO;
            this.ENDERECO = data.ENDERECO;
            this.TELEFONE = data.TELEFONE;
    
        }
    }



}