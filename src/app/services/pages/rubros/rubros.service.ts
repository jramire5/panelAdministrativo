import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { RubroResponse, Rubros } from 'src/app/models/rubros';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

ato = localStorage.getItem('ATO') as string;
  constructor(private http:HttpClient) { }
  create(rubrosData:Rubros): Observable<RubroResponse | void>{
    const headers = new HttpHeaders({'Authorization':this.ato})
    return this.http.post<RubroResponse>(`${environment.api_URL}/rubros`, {nombre: rubrosData.nombre, codigo: rubrosData.codigo},{headers}).pipe(
      map((res: RubroResponse) => {
        console.log('rubro', res)
      }),
      catchError((err) => this.handleError(err))
      )
    }
    delete(rubroID:number): Observable<Rubros | void>{
      const headers = new HttpHeaders({'authorization':this.ato})
      return this.http.post<Rubros>(`${environment.api_URL}/rubros/eliminar`,{id: rubroID},{headers}).pipe(
        map((res: Rubros) => {
          console.log('Rubro', res)
        }),
        catchError((err) => this.handleError(err))
        )
      }
      edit(rubrosData:Rubros, rubroID: number): Observable<Rubros | void>{
        const headers = new HttpHeaders({'authorization':this.ato})
        return this.http.post<Rubros>(`${environment.api_URL}/rubros/${rubroID}`, {id:rubroID, nombre: rubrosData.nombre, codigo: rubrosData.codigo},{headers}).pipe(
          map((res: Rubros) => {
            console.log('Rubro', res)
          }),
          catchError((err) => this.handleError(err))
          )
        }
    getRubros(): Observable<Rubros[] | any>{
    const headers = new HttpHeaders({'Authorization':this.ato})
    return this.http.get<Rubros[]>(`${environment.api_URL}/rubros`,{headers})
    }
    getRubro(id: number): Observable<Rubros | any>{
      const headers = new HttpHeaders({'Authorization':this.ato})
      return this.http.get<Rubros>(`${environment.api_URL}/rubros/${id}`,{headers})
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