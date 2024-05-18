import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PortfolioItemComponent } from './portfolio-item/portfolio-item.component';
import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';
import { ModalProdutoComponent } from './modal-produto/modal-produto.component';
import { TabelaDoProdutorComponent } from './tabela-do-produtor/tabela-do-produtor.component';
import { AdminComponent } from './admin/admin.component';
import { ProdutorComponent } from './produtor-logado/produtor-logado.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, PortfolioItemComponent, CadastroFormComponent, TabelaDoProdutorComponent, AdminComponent, ProdutorComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Produtos-Locais-Sobradinho';
}
