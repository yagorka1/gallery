import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/photos/components/photos-list/photos-list.component')
      .then((m) => m.PhotosListComponent),

  },
  {
    path: 'favorites',
    loadComponent: () => import('./features/favorites/components/favorites-list/favorites-list.component')
      .then((m) => m.FavoritesListComponent),
  },
  {
    path: 'photos/:id',
    loadComponent: () =>
      import('./features/favorites/components/photo-details/photo-details.component').then(
        (m) => m.PhotoDetailsComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
