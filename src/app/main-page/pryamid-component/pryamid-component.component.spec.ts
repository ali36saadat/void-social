import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PryamidComponentComponent } from './pryamid-component.component';

describe('PryamidComponentComponent', () => {
  let component: PryamidComponentComponent;
  let fixture: ComponentFixture<PryamidComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PryamidComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PryamidComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
