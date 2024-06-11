import { Component, OnInit } from '@angular/core';
import { TabelaDoProdutorComponent } from '../../tabela-do-produtor/tabela-do-produtor.component';
import { LoginComponent } from '../../login/login.component';
import { PortfolioItemComponent } from '../../portfolio-item/portfolio-item.component';
import { CadastroFormComponent } from '../../cadastro-form/cadastro-form.component';
import { AdminComponent } from '../../admin/admin.component';
import { ProdutorComponent } from '../../produtor-logado/produtor-logado.component';
import { ProdutorService } from '../../services/produtor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabelaDoProdutorComponent, LoginComponent, LoginComponent, 
    PortfolioItemComponent, CadastroFormComponent, TabelaDoProdutorComponent, AdminComponent, ProdutorComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit { 

  produtores: any[] = [];

  produtorSelecionado: any = null;

  constructor(private produtorService: ProdutorService) {}

  ngOnInit(): void {
    this.produtorService.getProdutores().subscribe({
      next: (data) => {
        this.produtores = data.dados; // Ajuste de acordo com o formato da resposta
      },
      error: (error) => console.error('Erro ao buscar produtores:', error)
    });
  }

  abrirModal(produtor:any){
    this.produtorSelecionado = produtor;
  }

}
