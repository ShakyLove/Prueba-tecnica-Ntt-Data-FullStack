import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { EntradaComponent } from './entrada.component';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EntradaComponent', () => {
  let component: EntradaComponent;
  let fixture: ComponentFixture<EntradaComponent>;
  let clienteService: jasmine.SpyObj<ClienteService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const clienteServiceSpy = jasmine.createSpyObj('ClienteService', [
      'consultarCliente',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [EntradaComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ClienteService, useValue: clienteServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntradaComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(
      ClienteService
    ) as jasmine.SpyObj<ClienteService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar el formulario correctamente', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('tipoDocumento')).toBeTruthy();
    expect(component.form.get('numeroDocumento')).toBeTruthy();
  });

  it('Debe marcar el formulario como inválido si está vacío', () => {
    expect(component.form.valid).toBeFalse();
    expect(component.form.get('tipoDocumento')?.valid).toBeFalse();
    expect(component.form.get('numeroDocumento')?.valid).toBeFalse();
  });

  it('Debe marcar el formulario como válido si tiene valores correctos', () => {
    component.form.setValue({
      tipoDocumento: 'C',
      numeroDocumento: '12345678',
    });
    expect(component.form.valid).toBeTrue();
  });

  it('Debe llamar al servicio cuando el formulario es válido', () => {
    const cliente = { nombre: 'Ana', apellido: 'Pérez' };
    clienteService.consultarCliente.and.returnValue(of(cliente));

    component.form.setValue({
      tipoDocumento: 'C',
      numeroDocumento: '12345678',
    });
    component.consultarCliente();

    expect(clienteService.consultarCliente).toHaveBeenCalledWith(
      'C',
      '12345678'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/usuario']);
  });

  it('Debe mostrar un mensaje de error si consultarCliente falla', () => {
    const snackBarSpy = spyOn(component, 'showSnackBar');
    clienteService.consultarCliente.and.returnValue(
      throwError(() => new Error('Error del servidor'))
    );

    component.form.setValue({
      tipoDocumento: 'C',
      numeroDocumento: '12345678',
    });
    component.consultarCliente();

    expect(clienteService.consultarCliente).toHaveBeenCalledWith(
      'C',
      '12345678'
    );
    expect(snackBarSpy).toHaveBeenCalledWith(
      'Error: Cliente no encontrado o problema en el servidor',
      'Cerrar'
    );
  });
});
