import { Component, OnInit } from '@angular/core';
import { Ventas } from 'src/app/models/ventas';
import { VentasService } from 'src/app/services/pages/ventas/ventas.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoVentasComponent implements OnInit{
constructor(private ventasService : VentasService){}
ventas: Ventas[] = []
ngOnInit(): void {
    this.ventasService.getVentas().subscribe((res) =>{
      console.log('respuesta', res);
      this.ventas = res.data;
    })
    }
}