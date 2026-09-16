import { Component, computed, inject, input, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
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
  usurarioService = inject(UsurarioServiceService);

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
    console.log(this._id());
  }

  getDataForm(event: SubmitEvent): void {
    event.preventDefault();
    console.log(this.usuarioForm());
  }

}
