import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForoService {
  private apiUrl = `${environment.baseUrl}/preguntas`;

  constructor(private http: HttpClient) {}

  obtenerPreguntas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  agregarPregunta(pregunta: any): Observable<any> {
    return this.http.post(this.apiUrl, pregunta);
  }

  responderPregunta(id: string, respuesta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/responder`, respuesta);
  }
}
