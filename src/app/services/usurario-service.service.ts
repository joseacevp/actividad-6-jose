import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iusuario.interface';

@Service()
export class UsurarioServiceService {

    // 1 url de la api
    private baseUrl: string = 'https://peticiones.online/api/users';
    // 4 injectamos el servicio HttpClient para poder usarlo en este servicio
    private httpClient = inject(HttpClient);

    // 5 metodo para obtener todos los usuarios con promesas
    getAllUsers() {
        return firstValueFrom(this.httpClient.get<IUser[]>(this.baseUrl));
    }

    getUserById(_id: string) {
        return firstValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`));
    }


}
