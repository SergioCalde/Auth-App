import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor( private http: HttpClient ) { }

  register( nombre: string, email: string, password: string) {
    //TODO: Crear funcion de registro como tarea
    
  }


  login( email: string, password: string ) {
    const url = `${this.baseUrl}/auth`;
    const body = {
      email, password
    }

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( resp => {
          if( resp.ok ){
            sessionStorage.setItem('token', resp.token!);
            this._user = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', sessionStorage.getItem('token') || '')
  
    return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {

          sessionStorage.setItem('token', resp.token!);
          this._user = {
            name: resp.name!,
            uid: resp.uid!
          }

          return resp.ok;
        } ),
        catchError( err => of(false) )
      );

    
  }

  logout() {
    sessionStorage.removeItem('token');
  }


}