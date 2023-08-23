import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { DataService } from 'src/app/services/data-service.service';
import { ClientesService } from 'src/app/services/pages/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router, private clientesService: ClientesService){}
  clientes: Clientes[] = [];
  clienteID: number = 0;
  ngOnInit(): void {
    if(this.clientes = []){
    this.clientesService.getClientes().subscribe((res) =>{
      this.clientes = res.data;
    })
    }}
    searchTerm: string = '';
    updateSearchResults(): void {
      if (this.searchTerm) {
        this.dataService.search(this.searchTerm, 'clientes')
        .subscribe(data => {
          console.log('datos',data)
          this.clientes = data.data;
        });
      }
    }
    delete(clienteID?: number): void{
      const id = clienteID as number;
      if(confirm('¿Quiere eliminar este Cliente?')){
      this.clientesService.delete(id).subscribe(
        (res) => {this.clientesService.getClientes().subscribe(
          response => this.clientes = response.data
        )}
      )
      }}
      ordenar(criterio: string):void {
        this.dataService.orderBy(criterio, 'clientes').subscribe((res) => {
        this.clientes = res.data
      })}
      seleccionar(id: number){
        this.clienteID = id;
      }

  }
