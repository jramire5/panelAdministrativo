import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Productos } from 'src/app/models/productos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  ato = localStorage.getItem('ATO') as string;

      constructor(private http:HttpClient) { }
      create(productosData:Productos): Observable<Productos | void>{
        const headers = new HttpHeaders({'authorization':this.ato})
        return this.http.post<Productos>(`${environment.api_URL}/productos`, {nombre: productosData.nombre, codigo: productosData.codigo, precio: productosData.precio, rubro_id: productosData?.rubro_id},{headers}).pipe(
          map((res: Productos) => {
          }),
          catchError((err) => this.handleError(err))
          )
        }
        edit(productosData:Productos, productoID: number): Observable<Productos | void>{
          const headers = new HttpHeaders({'authorization':this.ato})
          return this.http.post<Productos>(`${environment.api_URL}/productos/${productoID}`, {id:productoID, nombre: productosData.nombre, codigo: productosData.codigo, precio: productosData.precio, rubro_id: productosData?.rubro_id},{headers}).pipe(
            map((res: Productos) => {
            }),
            catchError((err) => this.handleError(err))
            )
          }
        delete(productoID:number): Observable<Productos | void>{
          const headers = new HttpHeaders({'authorization':this.ato})
          return this.http.post<Productos>(`${environment.api_URL}/productos/eliminar`,{id: productoID},{headers}).pipe(
            map((res: Productos) => {
            }),
            catchError((err) => this.handleError(err))
            )
          }
        getProductos(): Observable<Productos[] | any>{
        const headers = new HttpHeaders({'Authorization':this.ato})
        return this.http.get<Productos[]>(`${environment.api_URL}/productos`,{headers})
        }

        getProducto(id: number): Observable<Productos | any>{
          const headers = new HttpHeaders({'Authorization':this.ato})
          return this.http.get<Productos>(`${environment.api_URL}/productos/${id}`,{headers})
          }

      private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An error ocurred!';
        if (err){
          errorMessage= `Error: code ${err.message}`
        }
        window.alert(err)
        return throwError(() => err);
      }
    }