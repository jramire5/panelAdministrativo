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
      this.ventas = res.data;
    })
    }
    delete(ventaID?: number): void{
      const id = ventaID as number;
      this.ventasService.delete(id).subscribe(
        (res) => {this.ventasService.getVentas().subscribe(
          response => this.ventas = response.data
        )}
      )
      }
}