import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../dto/produtor.model';

@Component({
  selector: 'app-cadastro-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-form.component.html',
  styleUrl: './cadastro-form.component.scss'
})
export class CadastroFormComponent { 
    registerForm = new FormGroup({
      NOME: new FormControl('', [Validators.required]),
      EMAIL: new FormControl('', [Validators.required, Validators.email]),
      SENHA: new FormControl('', [Validators.required, Validators.minLength(6)]),
      DESCRICAO: new FormControl(''),
      ENDERECO: new FormControl('', [Validators.required]),
      TELEFONE: new FormControl('', [Validators.required, Validators.pattern("\\d{11,16}")]) //validação para um telefone de 11 até 16 numeros
  });

  constructor(private produtorService:ProdutorService){}

  cadastrar() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const p:Produtor = new Produtor(this.registerForm.value);
      console.log(p);
      this.produtorService.criarCadastro(p).subscribe(
        () => alert("Cadastrado com sucesso")
      );
    } else {
      alert('Cadastro inválido');
    }
  }

}
