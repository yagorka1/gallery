import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';

const STORAGE_KEY = 'favorites';
const photoA: PhotoInterface = { id: '1', url: 'url-1' };
const photoB: PhotoInterface = { id: '2', url: 'url-2' };

describe('FavoritesService', () => {
  const createService = (): FavoritesService => TestBed.inject(FavoritesService);

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  afterEach(() => localStorage.clear());

  it('is created and starts empty', () => {
    expect(createService().items()).toEqual([]);
  });

  it('adds a photo', () => {
    const service: FavoritesService = createService();
    service.add(photoA);

    expect(service.items()).toEqual([photoA]);
    expect(service.has('1')).toBeTrue();
  });

  it('does not add the same photo twice', () => {
    const service: FavoritesService = createService();
    service.add(photoA);
    service.add(photoA);

    expect(service.items().length).toBe(1);
  });

  it('removes a photo by id', () => {
    const service = createService();
    service.add(photoA);
    service.add(photoB);

    service.remove('1');

    expect(service.items()).toEqual([photoB]);
    expect(service.has('1')).toBeFalse();
  });

  it('has() returns false for an unknown id', () => {
    expect(createService().has('missing')).toBeFalse();
  });

  it('persists favorites to localStorage on add', () => {
    createService().add(photoA);

    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([photoA]);
  });

  it('persists favorites to localStorage on remove', () => {
    const service = createService();
    service.add(photoA);
    service.add(photoB);
    service.remove('1');

    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([photoB]);
  });

  it('restores favorites from localStorage on creation', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([photoA, photoB]));

    expect(createService().items()).toEqual([photoA, photoB]);
  });

  it('falls back to an empty list when storage holds invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'data');

    expect(createService().items()).toEqual([]);
  });

  it('falls back to an empty list when storage holds a non-array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ foo: 'bar' }));

    expect(createService().items()).toEqual([]);
  });

  it('exposes items as a read-only signal (no set/update)', () => {
    const items = createService().items as unknown as Record<string, unknown>;

    expect(items['set']).toBeUndefined();
    expect(items['update']).toBeUndefined();
  });
});
