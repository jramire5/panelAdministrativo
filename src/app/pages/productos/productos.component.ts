import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/pages/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  constructor(private router: Router, private productosService: ProductosService){}
  productos: Productos[] = [];
  ngOnInit(): void {
    this.productosService.getProductos().subscribe((res) =>{
      console.log('respuesta', res);
      this.productos = res.data;
      console.log(this.productos);
    })
    }
  }
