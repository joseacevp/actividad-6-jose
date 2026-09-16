import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iusuario.interface';

@Component({
  imports: [RouterLink],
  selector: 'app-usuario-card',
  styleUrl: './usuario-card.component.css',
  templateUrl: './usuario-card.component.html',
})
export class UsuarioCardComponent {

  //11 creamos un input para recibir el usuario desde el componente padre
  usuario = input.required<IUser>();
}
