import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/pages/productos/productos.service';

@Component({
  selector: 'app-add-productos',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddProductosComponent implements OnInit{
  constructor(private router: Router, private productosService: ProductosService, private fb: FormBuilder , public activatedRoute:ActivatedRoute){}
  editar = false;
  producto = this.fb.group({
    nombre:['', [Validators.required]],
    codigo:['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    precio:[0, [Validators.required]],
    rubro_id:['']
  })

  ngOnInit(): void{
    this.onLoad();
  }
  onLoad(): void{
    this.activatedRoute.params.subscribe(
      e => {
        let id=e['id'];
        if(id){
          this.editar = true;
          this.productosService.getProducto(id).subscribe(
            (es) => {
              console.log(this.producto)
              this.producto.patchValue({nombre: es.data.nombre,
                codigo:es.data.codigo,
                precio:es.data.precio,
                rubro_id: es.data.rubro_id
              })
              console.log(es.data)
            }
          )
        }
      }
    )
  }
  onCreate(): void{
    const formValue = this.producto.value;
    console.log('formValue', formValue)
    const createData = {
      nombre: formValue.nombre as string,
      codigo: formValue.codigo as string,
      precio: formValue.precio as number,
      rubro_id: formValue.rubro_id as string | undefined
    }
    if(confirm('Confirme la creación')){

      this.productosService.create(createData).subscribe( (res) =>
      {
        console.log('created', res)
      })
    }
  }
  onEdit(): void{
    const formValue = this.producto.value;
    this.activatedRoute.params.subscribe(
      e => {
        let id=e['id'];
        console.log('id',id)
        if(id){
    console.log('formValue', formValue)
    const editedData = {
      nombre: formValue.nombre as string,
      codigo: formValue.codigo as string,
      precio: formValue.precio as number,
      rubro_id: formValue.rubro_id as string | undefined
    }
    if(confirm('Confirme la Edicion')){
      this.productosService.edit(editedData, id).subscribe( (res) =>
      {this.router.navigate(['/productos'])})
    }
  }})
}
}
