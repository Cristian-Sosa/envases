import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketLayoutComponent } from './ticket-layout.component';

describe('TicketLayoutComponent', () => {
  let component: TicketLayoutComponent;
  let fixture: ComponentFixture<TicketLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketLayoutComponent]
    });
    fixture = TestBed.createComponent(TicketLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
