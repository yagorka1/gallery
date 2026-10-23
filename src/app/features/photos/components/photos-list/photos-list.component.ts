import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject, OnDestroy,
  signal, viewChild,
  WritableSignal
} from '@angular/core';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PhotoService } from '../../services/photo/photo.service';
import { FavoritesService } from '../../../favorites/services/favorites/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const PAGE_LIMIT: number = 30;
const TOST_DURATION: number = 2000;

@Component({
  selector: 'app-photos-list',
  standalone: true,
  imports: [
    PhotoCardComponent, MatProgressSpinner
  ],
  providers: [PhotoService],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosListComponent implements AfterViewInit, OnDestroy {
  private photoService: PhotoService = inject(PhotoService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private anchor = viewChild.required<ElementRef<HTMLElement>>('anchor');
  private observer?: IntersectionObserver;
  private currentPage: number = 1;
  private isEndOfList: boolean = false;
  private favoriteService: FavoritesService = inject(FavoritesService);
  private readonly snackBar = inject(MatSnackBar);

  public photos: WritableSignal<PhotoInterface[]> = signal<PhotoInterface[]>([]);
  public isLoading: WritableSignal<boolean> = signal(false);

  public ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && this.loadPhotos(),
      { rootMargin: '200px' },
    );
    this.observer.observe(this.anchor().nativeElement);
  }

  public ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  public loadPhotos() {
    if (this.isLoading() || this.isEndOfList) return;

    this.isLoading.set(true);

    this.photoService.loadPhotos(this.currentPage, PAGE_LIMIT).pipe(
      finalize(() => this.isLoading.set(false)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((data: PhotoInterface[]) => {
      this.currentPage = this.currentPage + 1;
      this.photos.update((prev: PhotoInterface[]) => [...prev, ...data]);

      if (data.length < PAGE_LIMIT) {
        this.isEndOfList = true;
      }
    })
  }

  public addToFavorite(photo: PhotoInterface) {
    if (!this.favoriteService.has(photo.id)) {
      this.snackBar.open('Added to favorites', 'OK', {
        duration: TOST_DURATION,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });

      this.favoriteService.add(photo);
    }
  }
}
