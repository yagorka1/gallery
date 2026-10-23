import { Component, input, InputSignal } from '@angular/core';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss'
})
export class PhotoCardComponent {
  public photo: InputSignal<PhotoInterface> = input.required<PhotoInterface>();
}
