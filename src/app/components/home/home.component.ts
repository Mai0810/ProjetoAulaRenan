import { Component } from '@angular/core';
import { TabelaDoProdutorComponent } from '../../tabela-do-produtor/tabela-do-produtor.component';
import { LoginComponent } from '../../login/login.component';
import { PortfolioItemComponent } from '../../portfolio-item/portfolio-item.component';
import { CadastroFormComponent } from '../../cadastro-form/cadastro-form.component';
import { AdminComponent } from '../../admin/admin.component';
import { ProdutorComponent } from '../../produtor-logado/produtor-logado.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabelaDoProdutorComponent, LoginComponent, LoginComponent, 
    PortfolioItemComponent, CadastroFormComponent, TabelaDoProdutorComponent, AdminComponent, ProdutorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
