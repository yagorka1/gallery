import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [
        MatAnchor,
        MatIcon,
        MatToolbar,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './header.component.scss'
})
export class HeaderComponent {}
