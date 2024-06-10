import { Injectable } from '@angular/core';
import { Usuario } from '../dto/usuario.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Produtor } from '../dto/produtor.model';
import { ProdutoDTO } from '../dto/produto.dto';

@Injectable({
  providedIn: 'root'
})
export class ProdutorLogadoService {
  usuarioIncompleto:BehaviorSubject<Usuario> = new BehaviorSubject(null as unknown as Usuario);

  readonly PORT:number = 5000;
  readonly baseUrl:string = `http://localhost:${this.PORT}`;

  constructor(private http:HttpClient) { }

  recuperarProdutor(id:number): Observable<Produtor> {
    const apiUrl:string = `${this.baseUrl}/produtor/${id}`
    return this.http.get<Produtor>(apiUrl)
    .pipe(map(data => new Produtor(data)));;
  }

  listarProdutos(idProdutor:number): Observable<ProdutoDTO[]> {
    const apiUrl:string = `${this.baseUrl}/produtor/${idProdutor}/produtos`
    return this.http.get<ProdutoDTO[]>(apiUrl);
  }

  alterarProdutor(produtorDadosAAlterar: Produtor, ID_USUARIO: number) {
    const apiUrl:string = `${this.baseUrl}/produtor/${ID_USUARIO}`;
    return this.http.put(apiUrl, produtorDadosAAlterar);
  }



  setUsuario(usuario: Usuario) {
    sessionStorage.setItem('usuario-logado', JSON.stringify(usuario));
    this.usuarioIncompleto.next(usuario);
  }
  
  setProdutor(produtor:Produtor) {
    sessionStorage.setItem('usuario-logado', JSON.stringify(produtor));
  }

  getProdutor(){
    const p = sessionStorage.getItem('usuario-logado');
    if(p)
      return JSON.parse(p);
    return null;
  }

  logout() {
    sessionStorage.setItem('usuario-logado', null  as unknown as string);
    sessionStorage.removeItem('usuario-logado');
    this.usuarioIncompleto.next(null as unknown as Usuario);  // Resetar o BehaviorSubject
  }


}
