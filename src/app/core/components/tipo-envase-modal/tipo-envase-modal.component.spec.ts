import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEnvaseModalComponent } from './tipo-envase-modal.component';

describe('TipoEnvaseModalComponent', () => {
  let component: TipoEnvaseModalComponent;
  let fixture: ComponentFixture<TipoEnvaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoEnvaseModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoEnvaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
