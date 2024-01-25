import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularValeComponent } from './anular-vale.component';

describe('AnularValeComponent', () => {
  let component: AnularValeComponent;
  let fixture: ComponentFixture<AnularValeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnularValeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnularValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
