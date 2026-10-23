import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesListComponent } from './favorites-list.component';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { FavoritesService } from '../../services/favorites/favorites.service';

const makeFavorites = (count: number): PhotoInterface[] =>
  Array.from({ length: count }, (_, i) => ({ id: String(i), url: `url-${i}` }));

describe('FavoritesListComponent', () => {
  let component: FavoritesListComponent;
  let fixture: ComponentFixture<FavoritesListComponent>;
  let router: jasmine.SpyObj<Router>;

  const favorites = signal<PhotoInterface[]>([]);
  const favoritesServiceMock = { items: favorites.asReadonly() };

  beforeEach(async () => {
    favorites.set([]);

    await TestBed.configureTestingModule({
      imports: [FavoritesListComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceMock },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows an empty message when there are no favorites', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.empty')).toBeTruthy();
    expect(el.querySelectorAll('app-photo-card').length).toBe(0);
  });

  it('renders one card per favorite photo', () => {
    favorites.set(makeFavorites(3));
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('app-photo-card').length).toBe(3);
    expect(el.querySelector('.empty')).toBeNull();
  });

  it('navigates to the single photo page on openDetail', () => {
    const photo: PhotoInterface = { id: '3', url: 'url-3' };

    component.openDetail(photo);

    expect(router.navigate).toHaveBeenCalledWith(['/photos', '3']);
  });

  it('updates the view reactively when favorites change', () => {
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('.empty')).toBeTruthy();

    favorites.set(makeFavorites(2));
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('app-photo-card').length).toBe(2);
    expect(el.querySelector('.empty')).toBeNull();
  });
});
