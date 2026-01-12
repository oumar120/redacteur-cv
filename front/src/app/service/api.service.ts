import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  urlApi = environment.apiUrl;
  saveCv(data: any) {
    return this.http.post(`${this.urlApi}/pdf/`, data,
      {
        responseType: 'blob'
      }
    );
  }
}
