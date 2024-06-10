import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoDTO } from '../dto/produto.dto';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly apiUrl = 'http://localhost:5000/produtos/salvar';//produtor

  constructor(private http: HttpClient) { }
  
  atualizarProdutos(produtorId: number, produtos: ProdutoDTO[]): Observable<ProdutoDTO[]> {
    const url = `${this.apiUrl}/${produtorId}`;
    return this.http.post<any>(url, produtos)
      .pipe(map(data => data));
  }

  deletar(idProduto: number): Observable<any> {
    const apiUrl = `http://localhost:5000/produtos/${idProduto}`;
    return this.http.delete(apiUrl);
  }
}
