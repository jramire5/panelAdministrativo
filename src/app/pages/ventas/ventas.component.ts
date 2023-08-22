import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Clientes } from 'src/app/models/clientes';
import { Items } from 'src/app/models/items';
import { Productos } from 'src/app/models/productos';
import { ClientesService } from 'src/app/services/pages/clientes/clientes.service';
import { ProductosService } from 'src/app/services/pages/productos/productos.service';
import { VentasService } from 'src/app/services/pages/ventas/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  constructor(private ventasService: VentasService, private productosService: ProductosService, private router: Router, private clientesService: ClientesService, private activatedRoute: ActivatedRoute, private fb:FormBuilder){}
  form = this.fb.group({
    cliente:[0],
    productos:[[]],
    importe_total:[0],
    observaciones: [''],
    fecha: new Date()
  })
  carritoForm = this.fb.group({
    id:[0],
    nombre:['']
    }  )
  producto: Productos = {
    nombre: '',
    codigo: '',
    precio: 0,
    rubro_id: '',
    id: 0
  }
  productos: Productos[] = []
  carrito: Productos[] = [];
  clientes: Clientes[] = [];
  items: Items[] = [];
  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((res) =>{
      this.clientes = res.data;
    })
    this.productosService.getProductos().subscribe((res) => {
      this.productos = res.data;
    })
    }
    onAdd(): void{
      const formValue = this.carritoForm.value.id;
      this.productosService.getProducto(formValue as number).subscribe((res) => {
        this.producto = {
          nombre: res.data.nombre,
          codigo: res.data.codigo,
          precio: res.data.precio as number,
          rubro_id: res.data.rubro_id,
          id: res.data.id
        }
        this.carrito.push(this.producto)
        this.form.value.importe_total = 0
        this.form.value.importe_total! += this.carrito.reduce((total, product) => +total + +product.precio, 0);

      })
      console.log(this.carrito);
    }
    onRemove(id: number): void {
      this.carrito.pop();
      this.form.value.importe_total = 0
      this.form.value.importe_total! += this.carrito.reduce((total, product) => +total + +product.precio, 0);
    }
    onCreate(): void{
      const formValue = this.form.value;
      console.log('formValue', formValue)
      const createData = {
        fecha: formValue.fecha as Date,
        cliente_id: formValue.cliente as number,
        importe_total: formValue.importe_total as number,
        observaciones: formValue.observaciones as string
      }
      if(confirm('Confirme la creación')){
        this.items = this.ventasService.calcularItems(this.carrito)

        this.ventasService.create(createData, this.items).subscribe( (res) =>
        {
          console.log('created', res)
          this.router.navigate(['/'])
        })
      }
    }
  }