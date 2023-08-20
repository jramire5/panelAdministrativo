import { Component, Input } from '@angular/core';
import { Products } from './../../models/products'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
@Input() products!: Products
};


