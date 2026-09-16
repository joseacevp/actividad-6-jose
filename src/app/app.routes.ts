import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioListComponent } from './pages/dashboard/usuario-list/usuario-list.component';
import { UsuarioViewComponent } from './pages/dashboard/usuario-view/usuario-view.component';
import { UsuarioFormComponent } from './pages/dashboard/usuario-form/usuario-form.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [


    //rutas de la aplicación
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
            { path: 'usuarios', component: UsuarioListComponent },
            { path: 'usuarios/:id', component: UsuarioViewComponent },
            { path: 'usuarios/new', component: UsuarioFormComponent },
            { path: 'usuarios/update/:id', component: UsuarioFormComponent }
        ]
    },
    { path: '**', component: Error404Component },

];
