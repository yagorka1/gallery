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
    loadComponent: () => import('./features/photos/components/favorites-list/favorites-list.component')
      .then((m) => m.FavoritesListComponent),

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
