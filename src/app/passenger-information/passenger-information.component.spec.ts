import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerInformationComponent } from './passenger-information.component';

describe('PassengerInformationComponent', () => {
  let component: PassengerInformationComponent;
  let fixture: ComponentFixture<PassengerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassengerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
