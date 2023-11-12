import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly BASE_URL;
  constructor(private http: HttpClient) {
    this.BASE_URL = "http://localhost:3000";
   }

  get(uri: string) {
    return this.http.get(`${this.BASE_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.BASE_URL}/${uri}`, payload);
  }

  patch(uri: string,  payload: Object) {
    return this.http.patch(`${this.BASE_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.BASE_URL}/${uri}`);
  }
}
