import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Items } from 'src/app/models/items';
import { Productos } from 'src/app/models/productos';
import { Ventas } from 'src/app/models/ventas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  ato = localStorage.getItem('ATO') as string;
  constructor(private http:HttpClient) { }
  create(ventasData:Ventas, items: any): Observable<Ventas | void>{
    const headers = new HttpHeaders({'Authorization':this.ato})
    return this.http.post<Ventas>(`${environment.api_URL}/ventas`, {items: items,cliente_id: ventasData.cliente_id, importe_total: ventasData.importe_total, fecha: ventasData.fecha, obervaciones: ventasData.observaciones},{headers}).pipe(
      map((res: Ventas) => {
      }),
      catchError((err) => this.handleError(err))
      )
    }
    delete(ventaID:number): Observable<Ventas | void>{
      const headers = new HttpHeaders({'authorization':this.ato})
      return this.http.post<Ventas>(`${environment.api_URL}/ventas/eliminar`,{id: ventaID},{headers}).pipe(
        map((res: Ventas) => {
        }),
        catchError((err) => this.handleError(err))
        )
      }
  calcularItems = (productos: Productos[]): Items[] => {
      const itemsMap: Map<number, Items> = new Map();
      productos.forEach((producto) => {
        const cantidad = 1; // Puedes ajustar esto según tus necesidades
        const importe_total = producto.precio * cantidad;
        if (itemsMap.has(producto.id as number)) {
          const existingItem = itemsMap.get(producto.id as number)!;
          existingItem.cantidad += cantidad;
          existingItem.importe_total += importe_total;
        } else {
          const newItem: Items = {
            producto_id: producto.id as number,
            cantidad: cantidad,
            importe_total: importe_total,
          };
          itemsMap.set(producto.id as number, newItem);
        }
      });
      return Array.from(itemsMap.values());
    };
    getVentas(): Observable<Ventas[] | any>{
      const headers = new HttpHeaders({'Authorization':this.ato})
      return this.http.get<Ventas[]>(`${environment.api_URL}/ventas`,{headers})
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
