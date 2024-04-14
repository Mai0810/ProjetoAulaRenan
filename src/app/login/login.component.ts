import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup | null = null; // Definindo o tipo da variável 'form' como FormGroup

    constructor(private formBuilder: FormBuilder) {
        this.criarForm();
    }

    criarForm() {
        this.form = this.formBuilder.group({
            email: [''],
            senha: ['']
        });
    }
  
}
