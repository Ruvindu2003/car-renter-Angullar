import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAdminBookingsComponent } from './get-admin-bookings.component';

describe('GetAdminBookingsComponent', () => {
  let component: GetAdminBookingsComponent;
  let fixture: ComponentFixture<GetAdminBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAdminBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAdminBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
