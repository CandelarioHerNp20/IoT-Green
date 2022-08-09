import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidorHumedadComponent } from './medidor-humedad.component';

describe('MedidorHumedadComponent', () => {
  let component: MedidorHumedadComponent;
  let fixture: ComponentFixture<MedidorHumedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedidorHumedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidorHumedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
