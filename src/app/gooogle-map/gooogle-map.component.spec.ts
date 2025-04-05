import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooogleMapComponent } from './gooogle-map.component';

describe('GooogleMapComponent', () => {
  let component: GooogleMapComponent;
  let fixture: ComponentFixture<GooogleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GooogleMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GooogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
