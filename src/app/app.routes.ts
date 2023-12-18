import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  {
    path: 'inicio-sesion',
    loadComponent: () => import('./index').then((m) => m.AuthComponent),
  },
];
