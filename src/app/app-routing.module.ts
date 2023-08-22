import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AddFormComponent } from './pages/rubros/add-form/add-form.component';
import { AddProductosComponent } from './pages/productos/add-form/add-form.component';
import { ClientesFormComponent } from './pages/clientes/clientesform/clientesform.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ListadoVentasComponent } from './pages/ventas/listado/listado.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'rubros', component: AddFormComponent},
  {path: 'rubros/:id', component: AddFormComponent},
  {path: 'productos', component: AddProductosComponent},
  {path: 'productos/:id', component: AddProductosComponent},
  {path: 'clientes', component: ClientesFormComponent},
  {path: 'clientes/:id', component: ClientesFormComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'ventas/listado', component: ListadoVentasComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
