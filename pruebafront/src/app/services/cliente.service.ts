import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8090/api/clientes';

  constructor(private http: HttpClient) {}

  // Método para consultar al cliente
  consultarCliente(tipoDocumento: string, numeroDocumento: string): Observable<any> {
    const params = { tipoDocumento, numeroDocumento };
    return this.http.get(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores HTTP
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del cliente:', error.error.message);
    } else {
      console.error(
        `Error del servidor: ${error.status}, ` + `Mensaje: ${error.error}`
      );
    }
    return throwError(
      'Hubo un problema con la solicitud; por favor, intenta de nuevo más tarde.'
    );
  }
}
