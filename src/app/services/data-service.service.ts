import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Productos } from '../models/productos';
import { Clientes } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  ato = localStorage.getItem('ATO') as string;

  constructor(private http:HttpClient) { }
  search(nombre: string, model: string): Observable<any>{
    const headers = new HttpHeaders({'Authorization':this.ato})
    return this.http.get<any>(`${environment.api_URL}/${model}?search=${nombre}`,{headers})
    }
    orderBy(criteria: string, resource: string): Observable<Productos[] | Clientes[] | any>{
      const headers = new HttpHeaders({'Authorization':this.ato})
      return this.http.get<Productos[] | Clientes[]>(`${environment.api_URL}/${resource}?order_by_column=${criteria}&order_by_direction=ASC`,{headers})
      }
}