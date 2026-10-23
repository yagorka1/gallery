import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotosListComponent } from './photos-list.component';
import { of } from 'rxjs';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';
import { PhotoService } from '../../services/photo/photo.service';

const makeBatch = (count: number, offset = 0): PhotoInterface[] =>
  Array.from({ length: count }, (_, i) => ({ id: String(offset + i), url: `url-${offset + i}` }));

describe('PhotosListComponent', () => {
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;
  let photoService: jasmine.SpyObj<PhotoService>;

  beforeEach(async () => {
    photoService = jasmine.createSpyObj<PhotoService>('FavoritesService', ['loadPhotos']);

    await TestBed.configureTestingModule({
      imports: [PhotosListComponent]
    })
      .overrideComponent(PhotosListComponent, {
        set: { providers: [{ provide: PhotoService, useValue: photoService }] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page and stores the photos', fakeAsync(() => {
    photoService.loadPhotos.and.returnValue(of(makeBatch(30)));

    component.loadPhotos();
    tick();

    expect(photoService.loadPhotos).toHaveBeenCalledWith(1, 30);
    expect(component.photos().length).toBe(30);
    expect(component.isLoading()).toBeFalse();
  }));

  it('appends the next page and increments the page number', fakeAsync(() => {
    photoService.loadPhotos.and.returnValues(of(makeBatch(30)), of(makeBatch(30, 30)));

    component.loadPhotos();
    tick();
    component.loadPhotos();
    tick();

    expect(photoService.loadPhotos.calls.allArgs()).toEqual([[1, 30], [2, 30]]);
    expect(component.photos().length).toBe(60);
  }));

  it('stops once a short page signals the end of the list', fakeAsync(() => {
    photoService.loadPhotos.and.returnValue(of(makeBatch(10))); // < PAGE_LIMIT

    component.loadPhotos();
    tick();
    component.loadPhotos(); // игнорируется
    tick();

    expect(photoService.loadPhotos).toHaveBeenCalledTimes(1);
    expect(component.photos().length).toBe(10);
  }));
});
