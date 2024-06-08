import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../dto/usuario.model';
import { Produtor } from '../dto/produtor.model';
import { ProdutorLogadoService } from '../services/produtor-logado.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produtor',
  templateUrl: './produtor-logado.component.html',
  styleUrls: ['./produtor-logado.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  standalone: true
})
export class ProdutorComponent implements OnInit, OnDestroy {
  produtorForm = new FormGroup({
    NOME: new FormControl('', Validators.required),
    EMAIL: new FormControl('', [Validators.required, Validators.email]),
    SENHA: new FormControl('', [Validators.required, Validators.minLength(6)]),
    DESCRICAO: new FormControl(''),
    ENDERECO: new FormControl('', Validators.required),
    TELEFONE: new FormControl('', [Validators.required, Validators.pattern('^\\d{10,11}$')])
  });

  produtos = [
    { nome: 'Batata', descricao: 'Descrição do produto', preco: 'R$ 1.00' },
    { nome: 'Quiabo', descricao: 'Descrição do produto', preco: 'R$ 2.00' }
  ];

  constructor(private route: ActivatedRoute, 
    private produtorLogadoService:ProdutorLogadoService,
    private router: Router // Injete Router
  ){

  }

  usuarioProdutor:Produtor = null as unknown as Produtor;

  subscriptionUsuario:Subscription = null as unknown as Subscription;

  ngOnInit() {
    this.subscriptionUsuario = this.produtorLogadoService.usuarioIncompleto.subscribe((usuario:Usuario)=> {
      if(!usuario)
        return;

      this.produtorLogadoService.recuperarProdutor(usuario.ID_USUARIO).subscribe(produtor => {
        this.produtorLogadoService.setProdutor(produtor);
        this.usuarioProdutor = produtor;
      });
    })
  }

  alterarDadosProdutor() {
    
    const produtorDadosAAlterar:Produtor = new Produtor(this.produtorForm.value);
    console.log('Dados do Produtor:', produtorDadosAAlterar);
    this.produtorLogadoService.alterarProdutor(produtorDadosAAlterar, this.usuarioProdutor.ID_USUARIO);
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


  logout() {
    this.produtorLogadoService.logout();
    this.router.navigate(['/login']); // Redirecionar para login após logout
  }


  ngOnDestroy(): void {
      this.subscriptionUsuario.unsubscribe();
  }
}
