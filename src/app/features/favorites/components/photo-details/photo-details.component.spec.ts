import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { signal } from '@angular/core';
import { FavoritesService } from '../../services/favorites/favorites.service';

const photo = (id: string): PhotoInterface => ({ id, url: `url-${id}` });

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let router: jasmine.SpyObj<Router>;
  let favorites: { items: any; remove: jasmine.Spy };

  beforeEach(async () => {
    favorites = {
      items: signal<PhotoInterface[]>([photo('1')]).asReadonly(),
      remove: jasmine.createSpy('remove'),
    };

    await TestBed.configureTestingModule({
      imports: [PhotoDetailsComponent],
      providers: [
        { provide: FavoritesService, useValue: favorites },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the photo when it is in favorites', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.details')).toBeTruthy();
    expect(el.querySelector('.empty')).toBeNull();
  });

  it('removes and navigates back to favorites', () => {
    component.removeFromFavorites();
    expect(favorites.remove).toHaveBeenCalledWith('1');
    expect(router.navigate).toHaveBeenCalledWith(['/favorites']);
  });
});
