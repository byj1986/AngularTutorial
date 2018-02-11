/*
 * Angular Imports
 */
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http';
// import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from '@angular/common';

/*
 * Components
 */
import { SearchComponent } from './components/SearchComponent';
import { ArtistComponent } from './components/ArtistComponent';
import { TrackComponent } from './components/TrackComponent';
import { AlbumComponent } from './components/AlbumComponent';

/*
 * Services
 */
import { iTunesService, ITUNES_PROVIDERS } from './services/iTunesService';
import { MusicSearchService } from './services/MusicSearchService';
import { SpotifyService, SPOTIFY_PROVIDERS } from './services/SpotifyService';

/*
 * Webpack
 */
require('css/styles.css');

@Component({
  selector: 'router-app',
  template: `
  <router-outlet></router-outlet>
  `
})
class RoutesDemoApp {
  query: string;

  ngOnInit(): void {
    console.info('RoutesDemoApp ngOnInit');
  }

}

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'artists/:id', component: ArtistComponent },
  { path: 'tracks/:id', component: TrackComponent },
  { path: 'albums/:id', component: AlbumComponent },
];

@NgModule({
  declarations: [
    RoutesDemoApp,
    SearchComponent,
    ArtistComponent,
    TrackComponent,
    AlbumComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes), // <-- routes
  ],
  bootstrap: [RoutesDemoApp],
  providers: [
    SPOTIFY_PROVIDERS,
    ITUNES_PROVIDERS,
    { provide: 'MusicSearchService', useClass: iTunesService },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
class RoutesDemoAppModule { }

platformBrowserDynamic().bootstrapModule(RoutesDemoAppModule)
  .catch((err: any) => console.error(err));
