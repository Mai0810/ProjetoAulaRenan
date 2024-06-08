import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from '../services/login.service';
import { HttpClient, HttpClientModule, HttpStatusCode } from '@angular/common/http';
import { Usuario } from '../dto/usuario.model';
import { Router } from '@angular/router';
import { error } from 'console';
import { ProdutorLogadoService } from '../services/produtor-logado.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup; // Definindo o tipo da variável 'form' como FormGroup

    constructor(private formBuilder: FormBuilder, private loginService:LoginService, private router: Router,
      private produtorLogadoService:ProdutorLogadoService
    ) {
      this.form = this.formBuilder.group({
          email: ['', [Validators.required]],
          senha: ['', [Validators.required]]
      });
    }

    private lidaComUsuario(usuario:Usuario) {
      if(!usuario.ID_USUARIO){
        alert("Email e/ou senha inválidos");
      }
      console.log(usuario);
      if(usuario.isAdmin()){
        // vai pro admin
        this.router.navigate(['/admin']);
      }else {
        // vai pro produtor
        this.produtorLogadoService.setUsuario(usuario);
        this.router.navigate(['/produtor-logado']);
      }
    }

    submeterLogin(){
      if(this.form?.valid){
        const email :string =  this.form.get('email')?.value;
        const senha: string = this.form.get('senha')?.value;
        this.loginService.login(email, senha).subscribe({
          next: (usuario: Usuario) => {
            this.lidaComUsuario(usuario);
          },
          error: (httpResponse) => {
            if(httpResponse.status == HttpStatusCode.NotFound){
              alert(httpResponse.error.msg);
            }
          }
        });
      }else {
        alert("formulário inválido de login");
      }
    }
  
}
