import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioComponent } from './usuario.component';
import { Router } from '@angular/router';

describe('UsuarioComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar los datos del cliente desde localStorage', () => {
    const cliente = {
      primerNombre: 'Ana',
      primerApellido: 'Pérez',
      direccion: 'Calle 123  #45-67',
      telefono: '3216549870',
      ciudadResidencia: 'Bogotá',
    };
    localStorage.setItem('cliente', JSON.stringify(cliente));
    component.ngOnInit();
    expect(component.cliente).toEqual(cliente);
  });

  it('Debe redirigir al usuario si no hay datos en localStorage', () => {
    localStorage.removeItem('cliente');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('Debe eliminar los datos del cliente de localStorage y redirigir al usuario', () => {
    const cliente = { primerNombre: 'Ana', primerApellido: 'Pérez' };
    localStorage.setItem('cliente', JSON.stringify(cliente));
    component.volver();
    expect(localStorage.getItem('cliente')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('Debe renderizar correctamente los datos del cliente', () => {
    const cliente = {
      primerNombre: 'Ana',
      primerApellido: 'Pérez',
      direccion: 'Calle 123  #45-67',
      telefono: '3216549870',
      ciudadResidencia: 'Bogotá',
    };
    component.cliente = cliente;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.profile-name')?.textContent).toContain('Ana Pérez');
    expect(compiled.querySelector('.profile-subtitle')?.textContent).toContain('Bogotá');
    expect(compiled.querySelector('.profile-info')?.textContent).toContain('Dirección: Calle 123  #45-67');
    expect(compiled.querySelector('.profile-info')?.textContent).toContain('Teléfono: 3216549870');
  });
});
