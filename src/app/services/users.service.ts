import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, tap } from 'rxjs';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = "https://api.github.com/users/Gabriel3002-maker";
  private apiProyectsUrl = "https://api.github.com/users/Gabriel3002-maker/repos?per_page=100";

  constructor(
    private http: HttpClient
  ) { }

  getInfoUser() {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        retry(3),
        tap(response => {
          // console.log("user", response);
        }),
        catchError(this.handleError)
      );
  }

  getInfoProyects() {
    return this.http.get<any[]>(this.apiProyectsUrl)
      .pipe(
        retry(3),
        tap(response => {
          // console.log("proyects", response);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Algo salió mal; por favor, inténtalo de nuevo más tarde.'));
  }
}
