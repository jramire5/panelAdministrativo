import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/pages/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  constructor(private router: Router, private productosService: ProductosService, public activatedRoute:ActivatedRoute){}
  productos: Productos[] = [];
  producto: Productos = {
    nombre: '',
    codigo: '',
    precio: 0,
    rubro_id: '',
    id: 0
  }
  ngOnInit(): void {
    this.productosService.getProductos().subscribe((res) =>{
      console.log('respuesta', res);
      this.productos = res.data;
      console.log(this.productos);
    })
    }
    delete(productoID?: number): void{
      if(confirm('Quiere eliminar este producto?')){
      this.productosService.delete(productoID as number).subscribe(
        (res) => {this.productosService.getProductos().subscribe(
          response => this.productos = response.data
        )}
      )
      }}
    }
