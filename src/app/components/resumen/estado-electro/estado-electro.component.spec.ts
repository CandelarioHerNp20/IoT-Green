import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoElectroComponent } from './estado-electro.component';

describe('EstadoElectroComponent', () => {
  let component: EstadoElectroComponent;
  let fixture: ComponentFixture<EstadoElectroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoElectroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoElectroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
