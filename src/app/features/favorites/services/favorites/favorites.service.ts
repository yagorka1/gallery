import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';

const STORAGE_KEY = 'favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly favorites: WritableSignal<PhotoInterface[]> = signal<PhotoInterface[]>(
    this.getFromStorage(),
  );

  public readonly items: Signal<PhotoInterface[]> = this.favorites.asReadonly();


  public has(id: string): boolean {
    return this.favorites().some((photo: PhotoInterface) => photo.id === id);
  }

  public add(photo: PhotoInterface): void {
    if (this.has(photo.id)) return;

    this.favorites.update((items: PhotoInterface[]) => [...items, photo]);
    this.addToStorage();
  }

  public remove(id: string): void {
    this.favorites.update((items: PhotoInterface[]) => items.filter((photo) => photo.id !== id));
    this.addToStorage();
  }

  private getFromStorage(): PhotoInterface[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private addToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favorites()));
    } catch {
      console.error('Failed to add to storage');
    }
  }
}
