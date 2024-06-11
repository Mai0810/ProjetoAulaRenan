import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProdutorService } from '../services/produtor.service';
import { ProdutorLogadoService } from '../services/produtor-logado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true, 
  imports: [CommonModule]
})
export class AdminComponent implements OnInit{
  produtores: any = [];

  constructor(private produtorService:ProdutorService,private produtorLogadoService:ProdutorLogadoService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.produtorService.getProdutores().subscribe({
      next: (data) => {
        this.produtores = data.dados; // Ajuste de acordo com o formato da resposta
      },
      error: (error) => console.error('Erro ao buscar produtores:', error)
    });
  }

  excluirProdutor(idProdutor: number) {
    if (confirm("Tem certeza?") && idProdutor !== undefined) {
      this.produtorLogadoService.deletarProdutor(idProdutor).subscribe(
        (res) => {
          this.produtores = this.produtores.filter((p:any) => p.ID_PRODUTOR !== idProdutor);
        }
      );
    } 
  }

  excluirConta() {
    // Lógica para excluir a conta do administrador
    console.log('Conta excluída.');
  }

  sair() {
    // Lógica para sair
    this.router.navigate(['/login']);
  }
}
