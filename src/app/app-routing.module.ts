import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ListadoVentasComponent } from './pages/ventas/listado/listado.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { RubrosComponent } from './pages/rubros/rubros.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'rubros', component: RubrosComponent},
  {path: 'rubros/:id', component: RubrosComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'productos/:id', component: ProductosComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/:id', component: ClientesComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'ventas/listado', component: ListadoVentasComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
