import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/pages/clientes/clientes.service';

@Component({
  selector: 'app-clientesform',
  templateUrl: './clientesform.component.html',
  styleUrls: ['./clientesform.component.css']
})

export class AddClientesComponent {
  addForm = this.fb.group({
    nombre:[''],
    cuit:[''],
    email:[''],
    domicilio:[''],
    telefono:['']
  })
  constructor(private router: Router, private clientesService: ClientesService, private fb: FormBuilder){}
  onCreate(): void{
    console.log('entered Clientes')
    const formValue = this.addForm.value;
    console.log('formValue', formValue)
    const createData = {
      nombre: formValue.nombre as string,
      cuit: formValue.cuit as string,
      email: formValue.email as string,
      domicilio: formValue.domicilio as string | undefined,
      telefono: formValue.telefono as string | undefined
    }
    this.clientesService.create(createData).subscribe( (res) =>
    {
    console.log('created', res)
    this.router.navigate([''])
  })
  }
}
