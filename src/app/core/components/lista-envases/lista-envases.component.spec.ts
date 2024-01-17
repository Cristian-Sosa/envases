import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEnvasesComponent } from './lista-envases.component';

describe('ListaEnvasesComponent', () => {
  let component: ListaEnvasesComponent;
  let fixture: ComponentFixture<ListaEnvasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEnvasesComponent]
    });
    fixture = TestBed.createComponent(ListaEnvasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
