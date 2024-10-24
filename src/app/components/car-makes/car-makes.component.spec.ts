import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarMakesComponent } from './car-makes.component';

describe('CarMakesComponent', () => {
  let component: CarMakesComponent;
  let fixture: ComponentFixture<CarMakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarMakesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarMakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
