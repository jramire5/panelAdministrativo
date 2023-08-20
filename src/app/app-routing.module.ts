import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AddFormComponent } from './pages/rubros/add-form/add-form.component';
import { AddProductosComponent } from './pages/productos/add-form/add-form.component';
import { AddClientesComponent } from './pages/clientes/clientesform/clientesform.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'rubros', component: AddFormComponent},
  {path: 'productos', component: AddProductosComponent},
  {path: 'clientes', component: AddClientesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
