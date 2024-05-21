import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../dto/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:5000/usuario/login';

  constructor(private http: HttpClient) {}

  login(email:string, senha: string ): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, {email, senha})
    .pipe(map(data => new Usuario(data)));
  }
}