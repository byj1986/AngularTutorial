/*
 * Angular Imports
 */
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';

/*
 * Components
 */
import { HomeComponent } from './components/HomeComponent';
import { AboutComponent } from './components/AboutComponent';
import { ContactComponent } from './components/ContactComponent';

/*
 * Webpack
 */
require('css/styles.css');

@Component({
  selector: 'router-app',
  template: `
  <div>
    <nav>
      <a>Navigation:</a>
      <ul>
        <li><a href="/#/home">New Home</a></li>
        <li><a [routerLink]="['home']">Home</a></li>
        <li><a [routerLink]="['about']">About</a></li>
        <li><a [routerLink]="['contact']">Contact Us</a></li>
        <li><a [routerLink]="['contactus']">222Contact Us2</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  </div>
  `
})
class RoutesDemoApp {
}

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contactus', redirectTo: 'about' },
];

@NgModule({
  declarations: [
    RoutesDemoApp,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // <-- routes
  ],
  bootstrap: [RoutesDemoApp],
  providers: [
    { provide: PathLocationStrategy, useClass: HashLocationStrategy },
    //if use { provide: PathLocationStrategy, useClass: HashLocationStrategy }
    //App will have # in browser
    //eg localhost:8080/#/about
    //if no { provide: PathLocationStrategy, useClass: HashLocationStrategy }
    //the url looks like localhost:8080/about

    //Same as <base href="/"> in index.html
    //{ provide: APP_BASE_HREF, useValue: '/' }
  ]
})
class RoutesDemoAppModule { }

platformBrowserDynamic().bootstrapModule(RoutesDemoAppModule)
  .catch((err: any) => console.error(err));
