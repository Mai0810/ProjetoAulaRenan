import { Injectable } from '@angular/core';
import { Usuario } from '../dto/usuario.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Produtor } from '../dto/produtor.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutorLogadoService {
  alterarProdutor(produtorDadosAAlterar: Produtor, ID_USUARIO: number) {
    throw new Error('Method not implemented.');
  }

  usuarioIncompleto:BehaviorSubject<Usuario> = new BehaviorSubject(null as unknown as Usuario);

  

  constructor(private http:HttpClient) { }

  recuperarProdutor(id:number): Observable<Produtor> {
    const apiUrl:string = `http://localhost:5000/produtor/${id}`
    return this.http.get<Produtor>(apiUrl)
    .pipe(map(data => new Produtor(data)));;
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
