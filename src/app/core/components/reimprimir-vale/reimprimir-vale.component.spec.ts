import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimprimirValeComponent } from './reimprimir-vale.component';

describe('ReimprimirValeComponent', () => {
  let component: ReimprimirValeComponent;
  let fixture: ComponentFixture<ReimprimirValeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReimprimirValeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReimprimirValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
