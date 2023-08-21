import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/pages/productos/productos.service';

@Component({
  selector: 'app-add-productos',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddProductosComponent {
  addForm = this.fb.group({
    nombre:['', [Validators.required]],
    codigo:['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    precio:[0, [Validators.required]],
    RUBRO_ID:['']
  })
  constructor(private router: Router, private productosService: ProductosService, private fb: FormBuilder){}
  onCreate(): void{
    const formValue = this.addForm.value;
    console.log('formValue', formValue)
    const createData = {
      nombre: formValue.nombre as string,
      codigo: formValue.codigo as string,
      precio: formValue.precio as number,
      RUBRO_ID: formValue.RUBRO_ID as number | undefined
    }
    if(confirm('Confirme la creación')){

      this.productosService.create(createData).subscribe( (res) =>
      {
        console.log('created', res)
      })
    }
  }

}
