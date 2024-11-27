import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crear el componente', () => {
    expect(service).toBeTruthy();
  });

  it('Debe realizar una solicitud GET para consultarCliente', () => {
    const cliente = {
      primerNombre: 'Ana',
      primerApellido: 'Pérez',
      direccion: 'Calle 123',
      telefono: '3216549870',
      ciudadResidencia: 'Bogotá',
    };

    const tipoDocumento = 'C';
    const numeroDocumento = '12345678';

    service.consultarCliente(tipoDocumento, numeroDocumento).subscribe((response) => {
      expect(response).toEqual(cliente);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?tipoDocumento=C&numeroDocumento=12345678`);
    expect(req.request.method).toBe('GET');
    req.flush(cliente); 
  });

});
