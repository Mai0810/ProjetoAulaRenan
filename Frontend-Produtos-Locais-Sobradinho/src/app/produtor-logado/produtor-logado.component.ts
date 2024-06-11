import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../dto/usuario.model';
import { Produtor } from '../dto/produtor.model';
import { ProdutorLogadoService } from '../services/produtor-logado.service';
import { Subscription } from 'rxjs';
import { ProdutoDTO } from '../dto/produto.dto';
import { ProdutosService } from '../services/produtos.service';


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


  produtos: ProdutoDTO[] = [ ];

  constructor(private route: ActivatedRoute, 
    private produtorLogadoService:ProdutorLogadoService,
    private router: Router, // Injete Router
    private produtosService:ProdutosService ){

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
        this.setDadosForm(produtor);
        this.produtorLogadoService.listarProdutos(produtor.ID_PRODUTOR).subscribe((res:ProdutoDTO[]) => {
          this.produtos = res;
        })
      });

    })
  }

  setDadosForm(produtor: Produtor): void{
    this.produtorForm.setValue({
      NOME: produtor.NOME,
      EMAIL: produtor.EMAIL,
      DESCRICAO: produtor.DESCRICAO,
      ENDERECO: produtor.ENDERECO,
      SENHA: produtor.SENHA,
      TELEFONE: produtor.TELEFONE
    });
  
  }

  alterarDadosProdutor() {
    console.log('Dados do Produtor:', this.produtorForm.value);
    const produtor:Produtor = new Produtor(this.produtorForm.value);
    console.log(produtor);
    this.produtorLogadoService.alterarProdutor(produtor, this.usuarioProdutor.ID_USUARIO).subscribe(
      (res) => {
        //this.produtorLogadoService.setProdutor();
      },
      (err) => {

      }
    )
  }

  removerProdutor() {
    this.produtorLogadoService.deletarProdutor(this.usuarioProdutor.ID_PRODUTOR).subscribe({
      next: (res) => {
        this.produtorLogadoService.setProdutor(null as unknown as Produtor);
        this.router.navigate(['/login'])
      },
      error: (err) => alert('Erro ao excluir produtor!')
    });
  }








  adicionarProduto() {
    this.produtos.push({ NOME: '', DESCRICAO: '', PRECO: '' });
  }

  removerProduto(idProduto: number | undefined) {
    if (confirm("Tem certeza?") && idProduto !== undefined) {
      this.produtosService.deletar(idProduto).subscribe(res => {
        this.produtos = this.produtos.filter(p => p.ID_PRODUTO !== idProduto);
      });
    } 
  }

  atualizarProdutos() {
    const filtrados:ProdutoDTO[] = this.produtos.filter((p) => p.NOME.trim().length !== 0 && p.PRECO.trim().length !== 0);
    console.log('Produtos Atualizados:', filtrados);
    this.produtosService.atualizarProdutos(this.usuarioProdutor.ID_PRODUTOR, filtrados).subscribe(data => this.produtos = data);
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
