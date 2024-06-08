import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDoProdutorComponent } from './tabela-do-produtor.component';

describe('TabelaDoProdutorComponent', () => {
  let component: TabelaDoProdutorComponent;
  let fixture: ComponentFixture<TabelaDoProdutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaDoProdutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaDoProdutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
