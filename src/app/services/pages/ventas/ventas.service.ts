import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Ventas } from 'src/app/models/ventas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  ato = localStorage.getItem('ATO') as string;
  constructor(private http:HttpClient) { }
  create(ventasData:Ventas): Observable<Ventas | void>{
    const headers = new HttpHeaders({'Authorization':this.ato})
    return this.http.post<Ventas>(`${environment.api_URL}/ventas`, {cliente_id: ventasData.cliente_id, importeTotal: ventasData.importe_total},{headers}).pipe(
      map((res: Ventas) => {
        console.log('Venta', res)
      }),
      catchError((err) => this.handleError(err))
      )
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
