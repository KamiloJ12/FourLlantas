import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login(data: Object): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'auth/ingresar', data, { headers: headers });
  }

  getHistorialByCliente(idCliente: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.get(this.url + 'historial/'+idCliente, { headers: headers });
  }
}
