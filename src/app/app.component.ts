import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from './models/productos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'panelAdministrativo';
  public loggedIn = localStorage.getItem('ATO');
  http = inject(HttpClient)
  changeTitle() {
    this.title = 'Panel Administrativo'
  }

}
