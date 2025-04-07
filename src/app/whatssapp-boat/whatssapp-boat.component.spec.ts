import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatssappBoatComponent } from './whatssapp-boat.component';

describe('WhatssappBoatComponent', () => {
  let component: WhatssappBoatComponent;
  let fixture: ComponentFixture<WhatssappBoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatssappBoatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatssappBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
