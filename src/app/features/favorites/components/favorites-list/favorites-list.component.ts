import { Component, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';
import { PhotoCardComponent } from '../../../photos/components/photo-card/photo-card.component';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [
    PhotoCardComponent
  ],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss'
})
export class FavoritesListComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly router: Router = inject(Router);

  readonly favorites: Signal<PhotoInterface[]> = this.favoritesService.items;

  public openDetail(photo: PhotoInterface): void {
    this.router.navigate(['/photos', photo.id]);
  }
}
