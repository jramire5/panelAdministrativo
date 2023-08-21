import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RubrosService } from 'src/app/services/pages/rubros/rubros.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit{
  constructor(public activatedRoute: ActivatedRoute, private router: Router, private rubrosService: RubrosService, private fb: FormBuilder){}
ngOnInit(): void {
  this.onLoad();
}
  editar = false;

  addForm = this.fb.group({
    nombre:[''],
    codigo:['']
  })
  onLoad(): void{
    this.activatedRoute.params.subscribe(
      e => {
        let id=e['id'];
        if(id){
          this.editar = true;
          this.rubrosService.getRubro(id).subscribe(
            (es) => {
              this.addForm.patchValue({nombre: es.data.nombre,
                codigo:es.data.codigo,
              })
              console.log(es.data)
              console.log('addform',this.addForm)
            }
          )
        }
      }
    )
  }

  onCreate(): void{ActivatedRoute
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
  onEdit(): void{
    const formValue = this.addForm.value;
    this.activatedRoute.params.subscribe(
      e => {
        let id=e['id'];
        console.log('id',id)
        if(id){
    console.log('formValue', formValue)
    const editedData = {
      nombre: formValue.nombre as string,
      codigo: formValue.codigo as string,
    }
    if(confirm('Confirme la Edicion')){

      this.rubrosService.edit(editedData, id).subscribe( (res) =>
      {this.rubrosService.getRubros().subscribe(
      )})
    }
  }})
}
}
