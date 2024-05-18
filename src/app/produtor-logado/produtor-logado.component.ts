import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produtor',
  templateUrl: './produtor-logado.component.html',
  styleUrls: ['./produtor-logado.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  standalone: true
})
export class ProdutorComponent {
  produtorForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    descricao: new FormControl(''),
    endereco: new FormControl('', Validators.required),
    telefone: new FormControl('', [Validators.required, Validators.pattern('^\\d{10,11}$')])
  });

  produtos = [
    { nome: 'Batata', descricao: 'Descrição do produto', preco: 'R$ 1.00' },
    { nome: 'Quiabo', descricao: 'Descrição do produto', preco: 'R$ 2.00' }
  ];

  onSubmit() {
    console.log('Dados do Produtor:', this.produtorForm.value);
  }

  adicionarProduto() {
    this.produtos.push({ nome: '', descricao: '', preco: '' });
  }

  removerProduto(index: number) {
    this.produtos.splice(index, 1);
  }

  atualizarProdutos() {
    console.log('Produtos Atualizados:', this.produtos);
  }

  excluirConta() {
    console.log('Conta excluída.');
  }
}
