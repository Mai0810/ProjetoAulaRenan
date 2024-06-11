import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar para o ngFor e o pipe de moeda

@Component({
  selector: 'app-tabela-do-produtor',
  templateUrl: './tabela-do-produtor.component.html',
  styleUrls: ['./tabela-do-produtor.component.scss'],
  standalone: true,
  imports: [CommonModule] // Importar CommonModule aqui
})
export class TabelaDoProdutorComponent {
  @Input()
  products: any = [];
  
  // aqui posso adicionar quaisquer métodos adicionais necessários para o componente
}
