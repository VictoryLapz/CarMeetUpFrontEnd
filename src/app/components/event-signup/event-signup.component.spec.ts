import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSignupComponent } from './event-signup.component';

describe('EventSignupComponent', () => {
  let component: EventSignupComponent;
  let fixture: ComponentFixture<EventSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
