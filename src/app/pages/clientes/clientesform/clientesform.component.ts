import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/pages/clientes/clientes.service';

@Component({
  selector: 'app-clientesform',
  templateUrl: './clientesform.component.html',
  styleUrls: ['./clientesform.component.css']
})

export class ClientesFormComponent implements OnInit{
  editar = false;
  constructor(private router: Router, private clientesService: ClientesService, private fb: FormBuilder, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.onLoad();
  }
  form = this.fb.group({
    nombre:[''],
    cuit:[''],
    email:[''],
    domicilio:[''],
    telefono:['']
  })
  onCreate(): void{
    const formValue = this.form.value;
    const createData = {
      nombre: formValue.nombre as string,
      cuit: formValue.cuit as string,
      email: formValue.email as string,
      domicilio: formValue.domicilio as string | undefined,
      telefono: formValue.telefono as string | undefined
    }
    this.clientesService.create(createData).subscribe( (res) =>
    {
    this.router.navigate([''])
  })
  }
  onLoad(): void{
    this.activatedRoute.params.subscribe(
      e => {
        let id=e['id'];
        if(id){
          this.editar = true;
          this.clientesService.getCliente(id).subscribe(
            (es) => {
              this.form.patchValue({
                nombre: es.data.nombre,
                cuit: es.data.cuit,
                email:es.data.email,
                domicilio:es.data.domicilio,
                telefono: es.data.telefono
              })
            }
          )
        }
      }
    )
  }
  onEdit(): void{
    const formValue = this.form.value as Clientes;
    this.activatedRoute.params.subscribe(
      e => {
        let id=e['id'];
        if(id){
    if(confirm('Confirme la Edicion')){
      this.clientesService.edit(formValue, id).subscribe( (res) =>
      {this.router.navigate(['/productos'])})
    }
  }})
}
}
