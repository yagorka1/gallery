import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCardComponent } from './photo-card.component';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';

const testPhoto: PhotoInterface = {
  id: '1',
  url: 'https://picsum.photos/id/1/200/300',
};

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;
  let fixture: ComponentFixture<PhotoCardComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoCardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('photo', testPhoto);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders an image with the photo alt text', () => {
    const img = element.querySelector('img.photo') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toBe('Photo 1');
  });

  it('renders an image pointing at the photo url', () => {
    const img = element.querySelector('img.photo') as HTMLImageElement;
    expect(img.src).toContain('/id/1/200/300');
  });

  it('emits cardClick with the photo when the button is clicked', () => {
    let emitted: PhotoInterface | undefined;
    component.cardClick.subscribe((p) => (emitted = p));

    (element.querySelector('.photo-button') as HTMLButtonElement).click();

    expect(emitted).toEqual(testPhoto);
  });
});
