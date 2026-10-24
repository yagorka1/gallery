import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    HeaderComponent,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withXhr()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
