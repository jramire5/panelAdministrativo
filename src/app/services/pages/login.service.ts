import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User, UserResponse } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(userData:User): Observable<UserResponse | void> {
    const userName = userData.username!;
    const pass = userData.password!;
    return this.http
    .post<UserResponse>(`${environment.api_URL}/login`,{'username': userName , 'password': pass})
    .pipe(
      map((res: UserResponse) => {
        console.log('res', res);
        this.saveToken(res.ATO);
        this.saveUsername(userName);
      }),
      catchError((err) => this.handleError(err))
    )
  }


  logout(): void{
    localStorage.removeItem('ATO');
    localStorage.clear;
    // set userIsLogged = false;
  }
  private checkToken(): boolean{
    const userToken = localStorage.getItem('ATO');
    if(userToken){
      return true;
    }else{
      return false;
    }
  }
  private saveToken(token: string): void{
    localStorage.setItem('ATO', token);
  }
  private saveUsername(username: string): void{
    localStorage.setItem('username', username)
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
