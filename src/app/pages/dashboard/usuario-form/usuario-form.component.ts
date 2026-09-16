import { Component, computed, inject, input, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { IUser } from '../../../interfaces/iusuario.interface';
import { UsurarioServiceService } from '../../../services/usurario-service.service';
@Component({
  imports: [FormField],
  selector: 'app-usuario-form',
  styleUrl: './usuario-form.component.css',
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent {

  //2 formulario cogemos el id del usuario a actualizar desde la ruta
  _id = input<string>();
  title = computed(() => this._id() ? 'Actualizar Usuario' : 'Nuevo Usuario');
  private readonly usurarioService = inject(UsurarioServiceService);
  private readonly router = inject(Router);
  guardando = signal(false);
  error = signal('');

  usuarioForm = signal<IUser>({
    _id: '',
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    password: '',
  });

  usuarioFields = form(this.usuarioForm);


  ngOnInit(): void {
    const id = this._id();
    if (id) {
      void this.cargarUsuario(id);
    }
  }

  private async cargarUsuario(id: string): Promise<void> {
    try {
      const usuario = await this.usurarioService.getUserById(id);
      this.usuarioForm.set(usuario);
    } catch {
      this.error.set('No se pudo cargar el usuario.');
    }
  }

  async getDataForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    this.error.set('');
    this.guardando.set(true);

    try {
      if (this._id()) {
        await this.usurarioService.updateUser(this.usuarioForm());
      } else {
        await this.usurarioService.insertUser(this.usuarioForm());
      }

      await this.router.navigate(['/dashboard']);
    } catch {
      this.error.set('No se pudo guardar el usuario. Inténtalo de nuevo.');
    } finally {
      this.guardando.set(false);
    }
  }

}
