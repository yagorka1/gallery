import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PhotoService } from './photo.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PhotoDtoInterface, PhotoInterface } from '../../../../core/interfaces/photo.interface';

const MAX_DELAY_FLUSH = 300;

const API_URL = 'https://picsum.photos/v2/list';

const dto = (id: string): PhotoDtoInterface => ({
  id,
  author: 'Author ' + id,
  width: 5000,
  height: 3333,
  url: `https://picsum.photos/id/${id}`,
  download_url: `https://picsum.photos/id/${id}/5000/3333`,
});

describe('PhotoService', () => {
  let service: PhotoService
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('requests the photos list endpoint with page and limit params', fakeAsync(() => {
    service.loadPhotos(2, 12).subscribe();

    const req = httpMock.expectOne((r) => r.url === API_URL);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('limit')).toBe('12');

    req.flush([]);
    tick(MAX_DELAY_FLUSH);
  }));

  it('maps the DTO to { id, url } with a sized image url', fakeAsync(() => {
    let result: PhotoInterface[] | undefined;
    service.loadPhotos(1, 2).subscribe((photos: PhotoInterface[]): PhotoInterface[] => (result = photos));

    httpMock.expectOne(() => true).flush([dto('10'), dto('20')]);
    tick(MAX_DELAY_FLUSH);

    expect(result).toEqual([
      { id: '10', url: 'https://picsum.photos/id/10/200/300' },
      { id: '20', url: 'https://picsum.photos/id/20/200/300' },
    ]);
  }));

  it('emits only after at least 200ms (emulated latency)', fakeAsync(() => {
    spyOn(Math, 'random').and.returnValue(0); // задержка = 200мс
    let result: PhotoInterface[] | undefined;

    service.loadPhotos(1, 1).subscribe((photos: PhotoInterface[]): PhotoInterface[] => (result = photos));
    httpMock.expectOne(() => true).flush([dto('1')]);

    tick(199);
    expect(result).toBeUndefined();
    tick(1);
    expect(result?.length).toBe(1);
  }));

  it('never waits longer than 300ms', fakeAsync(() => {
    spyOn(Math, 'random').and.returnValue(0.999);
    let result: PhotoInterface[] | undefined;

    service.loadPhotos(1, 1).subscribe((photos: PhotoInterface[]): PhotoInterface[] => (result = photos));
    httpMock.expectOne(() => true).flush([dto('1')]);

    tick(299);
    expect(result).toBeUndefined();
    tick(1);
    expect(result?.length).toBe(1);
  }));
});
