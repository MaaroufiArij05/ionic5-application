import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base_url = "http://127.0.0.1:3000/api/auth";
  private Header = {
    'Content-type': 'application/json',
    'Access-Control-Allow-origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Accept': 'application/json, text/plain'
  }
  constructor(private _http: HttpClient) { 

  }

  login(email: string, password:string): Observable<any> {
    const headers = new HttpHeaders(this.Header)
    return this._http.post(`${this.base_url}/login`,{
      email:email,
      password:password
    },{
      headers
    })
  }
}
