import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhPageComponent } from './searh-page.component';

describe('SearhPageComponent', () => {
  let component: SearhPageComponent;
  let fixture: ComponentFixture<SearhPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearhPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearhPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
