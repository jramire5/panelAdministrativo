import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Clientes } from 'src/app/models/clientes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
ato = localStorage.getItem('ATO') as string;
  constructor(private http:HttpClient) { }
  create(clientesData:Clientes): Observable<Clientes | void>{
    const headers = new HttpHeaders({'authorization':this.ato})

    return this.http.post<Clientes>(`${environment.api_URL}/clientes`, {nombre: clientesData.nombre, cuit: clientesData.cuit, email:clientesData.email, domicilio: clientesData?.domicilio, telefono: clientesData?.telefono},{headers}).pipe(
      map((res: Clientes) => {
      }),
      catchError((err) => this.handleError(err))
      )
    }
    delete(clienteID:number): Observable<Clientes | void>{
      const headers = new HttpHeaders({'authorization':this.ato})
      return this.http.post<Clientes>(`${environment.api_URL}/clientes/eliminar`,{id: clienteID},{headers}).pipe(
        map((res: Clientes) => {
        }),
        catchError((err) => this.handleError(err))
        )
      }
  getClientes(): Observable<Clientes[] | any>{
    const headers = new HttpHeaders({'authorization':this.ato})
    return this.http.get<Clientes[]>(`${environment.api_URL}/clientes`,{headers})
    }
    private handleError(err: HttpErrorResponse): Observable<never> {
      let errorMessage = 'An error ocurred!';
      if (err){
        errorMessage= `Error: code ${err.message}`
      }
      window.alert(err)
      return throwError(() => err);
    }
    getCliente(id: number): Observable<Clientes | any>{
      const headers = new HttpHeaders({'Authorization':this.ato})
      return this.http.get<Clientes>(`${environment.api_URL}/clientes/${id}`,{headers})
      }
    edit(clientesData:Clientes, clienteID: number): Observable<Clientes | void>{
        const headers = new HttpHeaders({'authorization':this.ato})
        return this.http.post<Clientes>(`${environment.api_URL}/clientes/${clienteID}`, {id:clienteID, nombre: clientesData.nombre, email:clientesData.email, cuit: clientesData.cuit, domicilio: clientesData.domicilio, telefono: clientesData.telefono},{headers}).pipe(
          map((res: Clientes) => {
          }),
          catchError((err) => this.handleError(err))
          )
        }
  }
