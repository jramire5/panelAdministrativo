import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoVentasComponent } from './listado.component';

describe('ListadoComponent', () => {
  let component: ListadoVentasComponent;
  let fixture: ComponentFixture<ListadoVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoVentasComponent]
    });
    fixture = TestBed.createComponent(ListadoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
