import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadEnvaseModalComponent } from './cantidad-envase-modal.component';

describe('CantidadEnvaseModalComponent', () => {
  let component: CantidadEnvaseModalComponent;
  let fixture: ComponentFixture<CantidadEnvaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantidadEnvaseModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CantidadEnvaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
