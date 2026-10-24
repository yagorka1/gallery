import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { PhotoDtoInterface, PhotoInterface } from '../../../../core/interfaces/photo.interface';

const MIN_DELAY = 200;
const MAX_DELAY = 300;
const API_URL = 'https://picsum.photos/v2/list';

@Injectable()
export class PhotoService {
  private httpClient: HttpClient = inject(HttpClient);

  public loadPhotos(page: number, limit: number): Observable<PhotoInterface[]> {
    const ms: number = MIN_DELAY + Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1));

    return this.httpClient
      .get<any[]>(API_URL, { params: { page, limit } })
      .pipe(
        map((items: PhotoDtoInterface[]) =>
          items.map((p: PhotoDtoInterface) => ({
            id: p.id,
            url: `https://picsum.photos/id/${p.id}/300/200`,
          })),
        ),
        delay(ms),
      );
  }
}
