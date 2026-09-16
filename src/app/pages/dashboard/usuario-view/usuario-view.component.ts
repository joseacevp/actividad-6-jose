import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsurarioServiceService } from '../../../services/usurario-service.service';
import { IUser } from '../../../interfaces/iusuario.interface';

@Component({
  imports: [RouterLink],
  selector: 'app-usuario-view',
  styleUrl: './usuario-view.component.css',
  templateUrl: './usuario-view.component.html',
})
export class UsuarioViewComponent {

  //16 injentamos el servicio para poder borrar el usuario
  usuarioservice = inject(UsurarioServiceService);
  //17 creamos un input para recibir el id del usuario desde el componente padre
  _id = input.required<string>();
  //18 creamos una señal para almacenar el usuario
  usuario = signal<IUser | null>(null)
  //19 función para cargar los detalles del usuario
  ngOnInit() {
    this.cargarUsuario();
  }
  //20 función para cargar los detalles del usuario
  private async cargarUsuario(): Promise<void> {
    try {
      const response = await this.usuarioservice.getUserById(this._id());
      this.usuario.set(response);
    } catch {
      alert('No se pudo cargar el usuario. Inténtalo de nuevo.');
    }
  }
}
