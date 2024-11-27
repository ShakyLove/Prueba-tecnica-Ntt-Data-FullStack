import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  cliente: any = {}; 

  constructor(private router: Router) {}

  ngOnInit() {
    /* Datos mockeados
    this.cliente = {
      primerNombre: 'Ana',
      primerApellido: 'Pérez',
      direccion: 'Calle 123  #45-67',
      telefono: '3216549870',
      ciudadResidencia: 'Bogotá',
    }; */

    // Obtener el cliente del localStorage
    const clienteData = localStorage.getItem('cliente');
    if (clienteData) {
      this.cliente = JSON.parse(clienteData);
    } else {
      this.router.navigate(['/']);
    }
  }

  volver() {
    // Eliminar el cliente del localStorage
    localStorage.removeItem('cliente');
    this.router.navigate(['/']);
  }
}
