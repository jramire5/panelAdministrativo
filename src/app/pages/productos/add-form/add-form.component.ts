import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from 'src/app/models/productos';
import { Rubros } from 'src/app/models/rubros';
import { ProductosService } from 'src/app/services/pages/productos/productos.service';
import { RubrosService } from 'src/app/services/pages/rubros/rubros.service';

@Component({
  selector: 'app-add-productos',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddProductosComponent implements OnInit{
  constructor(private rubrosService: RubrosService,private router: Router, private productosService: ProductosService, private fb: FormBuilder , public activatedRoute:ActivatedRoute){}
  rubros: Rubros[] = [];
  editar = false;
  producto = this.fb.group({
    nombre:['', [Validators.required]],
    codigo:['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    precio:[0, [Validators.required]],
    rubro_id:['']
  })

  ngOnInit(): void{
    this.onLoad();
    this.rubrosService.getRubros().subscribe((res) => {
      this.rubros = res.data;
    })
    }
  onLoad(): void{
    this.activatedRoute.params.subscribe(
      e => {
        let id=e['id'];
        if(id){
          this.editar = true;
          this.productosService.getProducto(id).subscribe(
            (es) => {
              this.producto.patchValue({nombre: es.data.nombre,
                codigo:es.data.codigo,
                precio:es.data.precio,
                rubro_id: es.data.rubro_id
              })
            }
          )
        }
      }
    )
  }
  onCreate(): void{
    const formValue = this.producto.value;
    const createData = {
      nombre: formValue.nombre as string,
      codigo: formValue.codigo as string,
      precio: formValue.precio as number,
      rubro_id: formValue.rubro_id as string
    }
    if(confirm('Confirme la creación')){

      this.productosService.create(createData).subscribe( (res) =>
      {
        this.router.navigate([''])
      })
    }
  }
  onEdit(): void{
    const formValue = this.producto.value;
    this.activatedRoute.params.subscribe(
      e => {
        let id=e['id'];
        if(id){
    const editedData = {
      nombre: formValue.nombre as string,
      codigo: formValue.codigo as string,
      precio: formValue.precio as number,
      rubro_id: formValue.rubro_id as string
    }
    if(confirm('Confirme la Edicion')){
      this.productosService.edit(editedData, id).subscribe( (res) =>
      {this.router.navigate(['/productos'])})
    }
  }})
}
}
