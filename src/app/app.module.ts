import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RubrosComponent } from './pages/rubros/rubros.component';
import { AddFormComponent } from './pages/rubros/add-form/add-form.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AddProductosComponent } from './pages/productos/add-form/add-form.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AddClientesComponent } from './pages/clientes/clientesform/clientesform.component';
import { VentasComponent } from './pages/ventas/ventas.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RubrosComponent,
    AddFormComponent,
    ProductosComponent,
    AddProductosComponent,
    ClientesComponent,
    AddClientesComponent,
    VentasComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
