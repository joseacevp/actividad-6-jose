import { Component, computed, inject, input, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { IUser } from '../../../interfaces/iusuario.interface';
import { UsurarioServiceService } from '../../../services/usurario-service.service';
@Component({
  //5  formulario importamos la libreria formField
  imports: [FormField],
  selector: 'app-usuario-form',
  styleUrl: './usuario-form.component.css',
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent {

  //2 formulario cogemos el id del usuario a actualizar desde la ruta
  _id = input<string>();
  //3 formulario cambia el titulo si recibe id o no 
  title = computed(() => this._id() ? 'Actualizar Usuario' : 'Nuevo Usuario');

  private readonly usurarioService = inject(UsurarioServiceService);
  private readonly router = inject(Router);
  guardando = signal(false);
  error = signal('');

  //4 formulario inicializamos el usarioForm 
  //metodo inicial
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
  //4 formulario recibe los datos del formulario 
  // usuarioForm contiene los datos y usuarioFields
  // permite utilizarlos individualmente en la plantilla.
  // creado a partir del modelo inicial
  usuarioFields = form(this.usuarioForm);


  ngOnInit(): void {
    const id = this._id();
    if (id) {
      void this.cargarUsuario(id);
    }
  }

  //4 formulario carga el usuario si recibe id 
  private async cargarUsuario(id: string): Promise<void> {
    try {
      const usuario = await this.usurarioService.getUserById(id);
      //carga el usuario en los campos del formulario 
      this.usuarioForm.set(usuario);
    } catch {
      this.error.set('No se pudo cargar el usuario.');
    }
  }

  // 4 formulario recibe los datos del html con los campos del formulario 
  // al pulsar guardar se obtien el objeto completo usuarioForm
  async getDataForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    this.error.set('');
    this.guardando.set(true);

    // 4 formulario si recibe id llama a actualizar y si no llama nuevo usuario
    // envia el objeto completo al servicio
    try {
      let usuarioGuardado: IUser;

      if (this._id()) {
        usuarioGuardado = await this.usurarioService.updateUser(this.usuarioForm());
      } else {
        usuarioGuardado = await this.usurarioService.insertUser(this.usuarioForm());
      }

      window.alert(
        `Usuario ${usuarioGuardado.first_name} ${usuarioGuardado.last_name} guardado correctamente.\nID: ${usuarioGuardado._id}`
      );

      // 4 cuando termina llama a la pagina inicio 
      await this.router.navigate(['/dashboard']);
    } catch {
      this.error.set('No se pudo guardar el usuario. Inténtalo de nuevo.');
    } finally {
      this.guardando.set(false);
    }
  }

}
