import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css'],
})
export class EntradaComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private clienteService: ClienteService,
              private snackBar: MatSnackBar)
  {
    this.form = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11),]]
    });
  }

  get error(): any {
    return this.form.controls;
  }

  ngOnInit(): void {}

  consultarCliente() {
    if (this.form.valid) {
      const { tipoDocumento, numeroDocumento } = this.form.value;

      this.clienteService.consultarCliente(tipoDocumento, numeroDocumento).subscribe((cliente) => {
        // Guardar el cliente 
        localStorage.setItem('cliente', JSON.stringify(cliente));
        this.router.navigate(['/usuario']);
      }, error => {
        this.showSnackBar(
          'Error: Cliente no encontrado o problema en el servidor',
          'Cerrar'
        );
      })
    }
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, 
      horizontalPosition: 'center', 
      verticalPosition: 'top', 
      panelClass: ['error-snackbar'], 
    });
  }
}
