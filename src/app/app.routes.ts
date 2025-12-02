import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth/login-page/login-page').then(m => m.LoginPageComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pokemon/pages/home-page/home-page').then(m => m.HomePageComponent)
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pokemon/pages/pokemon-detail-page/pokemon-detail-page').then(m => m.PokemonDetailPageComponent)
  },
  {
    path: '**', redirectTo: ''
  }
];
