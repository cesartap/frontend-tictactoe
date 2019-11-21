import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:5000/conditions/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ConditionsService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /**
   * Metodo para obtener las condiciones del juego
   */
  getConditions(): Observable<any> {
    return this.http.get(endpoint + 'all').pipe(
      map(this.extractData));
  }
}

