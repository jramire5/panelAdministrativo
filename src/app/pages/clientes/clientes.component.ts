import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/pages/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  constructor(private router: Router, private clientesService: ClientesService){}
  clientes: Clientes[] = [];
  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((res) =>{
      console.log('respuesta', res);
      this.clientes = res.data;
      console.log(this.clientes);
    })
    console.log(this.clientes)
    }
  }
