import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RubrosService } from 'src/app/services/pages/rubros/rubros.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  addForm = this.fb.group({
    nombre:[''],
    codigo:['']
  })
  constructor(private router: Router, private rubrosService: RubrosService, private fb: FormBuilder){}
  onCreate(): void{
    console.log('entered')
    const formValue = this.addForm.value;
    console.log('formValue', formValue)
      const createData = {
      nombre: formValue.nombre as string,
      codigo: formValue.codigo as string,
    };
    this.rubrosService.create(createData).subscribe( (res) =>
    {
    console.log('created', res)
    this.router.navigate([''])
  })
  }
}
