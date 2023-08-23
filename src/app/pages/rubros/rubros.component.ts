import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rubros } from 'src/app/models/rubros';
import { DataService } from 'src/app/services/data-service.service';
import { RubrosService } from 'src/app/services/pages/rubros/rubros.service';
@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.css']
})
export class RubrosComponent implements OnInit {
  constructor(private dataService: DataService, private rubrosService: RubrosService){}
  rubros: Rubros[] = [];
  rubroID: number = 0;
  ngOnInit(): void {
    this.rubrosService.getRubros().subscribe((res) =>{
      this.rubros = res.data;
    })
    }
    delete(rubroID?: number): void{
      const id = rubroID as number;
      this.rubrosService.delete(id).subscribe(
        (res) => {this.rubrosService.getRubros().subscribe(
          response => this.rubros = response.data
        )}
      )
      }
    seleccionar(id: number){
        this.rubroID = id;
      }

  }
