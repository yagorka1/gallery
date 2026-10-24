import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, InputSignal, Output } from '@angular/core';
import { PhotoInterface } from '../../../../core/interfaces/photo.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-photo-card',
    imports: [
        NgOptimizedImage,
    ],
    templateUrl: './photo-card.component.html',
    styleUrl: './photo-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoCardComponent {
  public photo: InputSignal<PhotoInterface> = input.required<PhotoInterface>();
  @Output() cardClick: EventEmitter<PhotoInterface> = new EventEmitter<PhotoInterface>();
}
