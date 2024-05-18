import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true, 
  imports: [CommonModule]
})
export class AdminComponent {
  produtores = [
    { nome: 'Verduras Orgânicas teste' },
    { nome: 'Frutas da Maize' },
    { nome: 'Granolas de Sobradinho teste' },
    { nome: 'Pestos do coração de Sobradinho teste' }
  ];

  excluirProdutor(index: number) {
    // Lógica para excluir o produtor
    console.log(`Produtor ${this.produtores[index].nome} excluído.`);
    this.produtores.splice(index, 1); 
  }

  excluirConta() {
    // Lógica para excluir a conta do administrador
    console.log('Conta excluída.');
  }

  sair() {
    // Lógica para sair
    console.log('Sessão encerrada.');
  }
}
