import { Routes } from '@angular/router';

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
      {
        path: 'reimprimir-vale',
        loadComponent: () =>
          import('./index').then((m) => m.ReimprimirValeComponent),
      },
    ],
  },
];
