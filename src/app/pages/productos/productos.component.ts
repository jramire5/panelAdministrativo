import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from 'src/app/models/productos';
import { DataService } from 'src/app/services/data-service.service';
import { ProductosService } from 'src/app/services/pages/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router, private productosService: ProductosService, public activatedRoute:ActivatedRoute, ){}
  productos: Productos[] = [];
  producto: Productos = {
    nombre: '',
    codigo: '',
    precio: 0,
    rubro_id: '',
    id: 0
  }
  id: number = 0;
  productosEncontrados: Productos[] = []
  searchTerm: string = '';
  paginas = [0]
  ngOnInit(): void {
    this.productosService.getProductos(1).subscribe((res) =>{
      this.productos = res.data;
      this.paginas.length = res.pagination.totalPages
      this.activatedRoute.params.subscribe(
        e => {
          let id=e['id'];
          if(id){
            this.id = id;
          }
    })
    })}
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
          this.dataService.search(this.searchTerm, 'productos')
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
        this.dataService.orderBy(criterio, 'productos').subscribe((res) => {
        this.productos = res.data
      })}
    }