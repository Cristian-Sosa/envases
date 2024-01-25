import { Routes } from '@angular/router';
import { AnularValeComponent } from './core/components';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  {
    path: 'inicio-sesion',
    loadComponent: () => import('./index').then((m) => m.AuthComponent),
  },
  {
    path: 'carga',
    loadComponent: () => import('./index').then((m) => m.CargaComponent),
    children: [
      {
        path: 'anular-vale',
        loadComponent: () =>
          import('./index').then((m) => m.AnularValeComponent),
      },
    ],
  },
];
