import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar para o ngFor e o pipe de moeda

@Component({
  selector: 'app-tabela-do-produtor',
  templateUrl: './tabela-do-produtor.component.html',
  styleUrls: ['./tabela-do-produtor.component.scss'],
  standalone: true,
  imports: [CommonModule] // Importar CommonModule aqui
})
export class TabelaDoProdutorComponent {
  products = [
    { name: 'Batata', description: 'Descrição do produto', price: 1.99 },
    { name: 'Quiabo', description: 'Descrição do produto', price: 2.99 },
    { name: 'Tomate', description: 'Descrição do produto', price: 3.99 },
    // adicione mais produtos conforme necessário
  ];
  
  // aqui posso adicionar quaisquer métodos adicionais necessários para o componente
}
