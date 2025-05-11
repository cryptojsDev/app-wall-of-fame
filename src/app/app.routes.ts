import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/memes/components/meme-grid/meme-grid.component')
      .then(m => m.MemeGridComponent)
  },
  {
    path: 'memes/:id',
    loadComponent: () => import('./features/memes/components/meme-detail/meme-detail.component')
      .then(m => m.MemeDetailComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/components/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/components/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'my-memes',
    canActivate: [authGuard],
    loadComponent: () => import('./features/memes/components/my-memes/my-memes.component')
      .then(m => m.MyMemesComponent)
  },
  {
    path: 'upload',
    canActivate: [authGuard],
    loadComponent: () => import('./features/memes/components/upload-meme/upload-meme.component')
      .then(m => m.UploadMemeComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/auth/components/profile/profile.component')
      .then(m => m.ProfileComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
