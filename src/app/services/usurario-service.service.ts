import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IUser, IUsersResponse } from '../interfaces/iusuario.interface';

@Injectable({ providedIn: 'root' })
export class UsurarioServiceService {

    // 1 url de la api
    private baseUrl: string = 'https://peticiones.online/api/users';
    // 4 injectamos el servicio HttpClient para poder usarlo en este servicio
    private httpClient = inject(HttpClient);

    // 5 metodo para obtener todos los usuarios con promesas
    async getAllUsers(): Promise<IUser[]> {
        const response = await firstValueFrom(
            this.httpClient.get<IUsersResponse>(this.baseUrl)
        );

        return response.results;
    }

    getUserById(_id: string) {
        return firstValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`));
    }

    //24 metodo para eliminar un usuario por su id
    deleteUserById(_id: string | undefined) {
        return firstValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`));
    }
}
