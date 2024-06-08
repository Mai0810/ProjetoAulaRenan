import { Injectable } from '@angular/core';
import { Produtor } from '../dto/produtor.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutorService {
  private readonly apiUrl = 'http://localhost:5000/produtor/adicionar';

  constructor(private http: HttpClient) { }
  criarCadastro( produtor : Produtor): Observable<Produtor> {
    return this.http.post<Produtor>(this.apiUrl, produtor)
    .pipe(map(data => new Produtor(data)));

  }
}

