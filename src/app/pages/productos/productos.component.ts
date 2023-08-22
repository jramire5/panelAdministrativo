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
  constructor(private router: Router, private productosService: ProductosService, public activatedRoute:ActivatedRoute, ){}
  
  productos: Productos[] = [];
  producto: Productos = {
    nombre: '',
    codigo: '',
    precio: 0,
    rubro_id: '',
    id: 0
  }
  productosEncontrados: Productos[] = []
  searchTerm: string = '';
  ngOnInit(): void {
    this.productosService.getProductos(1).subscribe((res) =>{
      this.productos = res.data;
    })
    }
    delete(productoID?: number): void{
      if(confirm('Quiere eliminar este producto?')){
      this.productosService.delete(productoID as number).subscribe(
        (res) => {this.productosService.getProductos(1).subscribe(
          response => this.productos = response.data
        )}
      )
      }}
      updateSearchResults(): void {
        if (this.searchTerm) {
          this.productosService.search(this.searchTerm)
          .subscribe(data => {
            console.log('datos',data)
            this.productos = data.data;
          });
        } else {
          this.productosEncontrados = [];
        }
      }
      pagina(pag: number): void {
        this.productosService.getProductos(pag).subscribe((res) =>{
          this.productos = res.data;
        })
      }
      ordenar(criterio: string):void {
        this.productosService.orderProductos(criterio).subscribe((res) => {
        this.productos = res.data
      })}
    }