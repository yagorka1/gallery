import { ChangeDetectionStrategy, Component, computed, inject, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { MatButtonModule } from '@angular/material/button';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetailsComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly favorites: FavoritesService = inject(FavoritesService);
  private readonly id: string = this.route.snapshot.paramMap.get('id') ?? '';
  public readonly photo: Signal<PhotoInterface | undefined> = computed(() => this.favorites.items().find((p) => p.id === this.id));
  public readonly url: Signal<string> = computed(() => `https://picsum.photos/id/${this.id}/1200/800`);

  public removeFromFavorites(): void {
    this.favorites.remove(this.id);
    this.router.navigate(['/favorites']);
  }
}
