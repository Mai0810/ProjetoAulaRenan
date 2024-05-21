import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-form.component.html',
  styleUrl: './cadastro-form.component.scss'
})
export class CadastroFormComponent { 
    registerForm = new FormGroup({
    nomeProdutor: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    descricao: new FormControl(''),
    endereco: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required, Validators.pattern("\\d{11,16}")]) //validação para um telefone de 11 até 16 numeros
  });

  cadastrar() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      alert('Cadastro inválido');
    }
  }

}
