import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Rubros } from 'src/app/models/rubros';
import { RubrosService } from 'src/app/services/pages/rubros/rubros.service';
@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.css']
})
export class RubrosComponent implements OnInit {
  constructor(private router: Router, private rubrosService: RubrosService){}
  rubros: Rubros[] = [];
  ngOnInit(): void {
    this.rubrosService.getRubros().subscribe((res) =>{
      this.rubros = res.data;
    })
    }
    delete(productoID?: number): void{
      const id = productoID as number;
      this.rubrosService.delete(id).subscribe(
        (res) => {this.rubrosService.getRubros().subscribe(
          response => this.rubros = response.data
        )}
      )
      }
  }
