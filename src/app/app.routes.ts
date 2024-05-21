import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProdutorComponent } from './produtor-logado/produtor-logado.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component:HomeComponent},
    {path: 'admin', component:AdminComponent},
    {path: 'produtor-logado', component:ProdutorComponent},
    {path: 'login', component:LoginComponent},
    {path: 'cadastro', component:CadastroFormComponent},



];
