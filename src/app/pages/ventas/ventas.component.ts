import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Clientes } from 'src/app/models/clientes';
import { Productos } from 'src/app/models/productos';
import { ClientesService } from 'src/app/services/pages/clientes/clientes.service';
import { ProductosService } from 'src/app/services/pages/productos/productos.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  constructor(private productosService: ProductosService, private router: Router, private clientesService: ClientesService, private activatedRoute: ActivatedRoute, private fb:FormBuilder){}
  form = this.fb.group({
    cliente:[0],
    productos:[[]],
    montoTotal:[0]
  })
  carritoForm = this.fb.group({
    
  })
  producto: Productos = {
    nombre: '',
    codigo: '',
    precio: 0,
    id: 0
  }
  productos: Productos[] = []
  carrito: Productos[] = []
  clientes: Clientes[] = [];
  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((res) =>{
      this.clientes = res.data;
    })
    this.productosService.getProductos().subscribe((res) => {
      this.productos = res.data;
    })
    }
    onAdd(): void{
      const formValue = this.carritoForm.value;
      console.log('formValue', formValue)
        console.log(this.carrito);
    }
  }