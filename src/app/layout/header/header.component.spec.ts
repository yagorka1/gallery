import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders exactly two navigation links', () => {
    const links = element.querySelectorAll('a.nav__link');
    expect(links.length).toBe(2);
  });

  it('links to Photos (/) and Favorites (/favorites)', () => {
    const links = Array.from(element.querySelectorAll('a.nav__link'));
    const hrefs = links.map((a) => a.getAttribute('href'));

    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/favorites');
  });

  it('shows the Photos and Favorites labels', () => {
    const text = element.textContent ?? '';
    expect(text).toContain('Photos');
    expect(text).toContain('Favorites');
  });

  it('marks the Photos link exact for active state', () => {
    const photosLink = element.querySelector('a.nav__link[href="/"]');
    expect(photosLink).toBeTruthy();
  });
});
