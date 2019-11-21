import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:5000/games/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /**
   * Metodo para obtener los juegos existentes del jugador
   */
  getPlayerGames(playerName: string): Observable<any> {
    let param = { user: playerName };
    return this.http.post<any>(endpoint + 'findByName', JSON.stringify(param), httpOptions).pipe(
      tap((param) => console.log(`Juego agregado c/ id=${param.id}`)),
      catchError(this.handleError<any>('getPlayerName'))
    );


  }

  /**
   * Metodo para guardar el juego de un usuario
   * @param userName 
   */
  addPlayerWins(userName): Observable<any> {
    let param = { user: userName };
    return this.http.post<any>(endpoint + 'add', JSON.stringify(param), httpOptions).pipe(
      tap((userName) => console.log(`Juego agregado c/ id=${userName.id}`)),
      catchError(this.handleError<any>('addPlayerWins'))
    );
  }

  /**
   * Manejo de errores
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
