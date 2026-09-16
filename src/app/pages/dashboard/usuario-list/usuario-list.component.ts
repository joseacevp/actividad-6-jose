import { Component, inject, signal } from '@angular/core';
import { UsurarioServiceService } from '../../../services/usurario-service.service';
import { IUser } from '../../../interfaces/iusuario.interface';
import { UsuarioCardComponent } from '../../../component/usuario-card/usuario-card.component';

@Component({
  imports: [UsuarioCardComponent],
  selector: 'app-usuario-list',
  styleUrl: './usuario-list.component.css',
  templateUrl: './usuario-list.component.html',
})
export class UsuarioListComponent {

  // 6 comunicacion con el servicio para obtener todos los usuarios
  usuarioService = inject(UsurarioServiceService);
  // 7 creamos una SIGNAL para almacenar los usuarios
  usuarioList = signal<IUser[]>([]);
  cargando = signal(true);
  error = signal('');

  constructor() {
    void this.cargarUsuarios();
  }
  // 8 metodo para cargar los usuarios y manejar errores
  private async cargarUsuarios(): Promise<void> {
    try {
      const usuarios = await this.usuarioService.getAllUsers();
      this.usuarioList.set(usuarios);
    } catch {
      this.error.set('No se pudieron cargar los usuarios. Inténtalo de nuevo.');
    } finally {
      this.cargando.set(false);
    }
  }
}
