/*
 * Angular
 */

import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

/*
 * Services
 */
import { MusicSearchService } from '..//services/MusicSearchService';
import { Observable } from 'rxjs/Observable';

// angular2 doesn't like 'track' as the selector
// because apparently it's an existing HTML element
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
@Component({
  selector: 'theTrack',
  template: `
  <div *ngIf="track">
    <h1>{{ track.name }}</h1>

    <p>
      <img src="{{ track.album.images[1].url }}">
    </p>

    <p>
      <audio controls src="{{ track.preview_url }}"></audio>
    </p>

    <p><a href (click)="back()">Back</a></p>
  </div>
  `
})
export class TrackComponent implements OnInit {
  id: string;
  track: Object;

  constructor(private route: ActivatedRoute,
    @Inject('MusicSearchService') private musicSearchService: MusicSearchService,
    private location: Location) {
    route.params.subscribe((params: Observable<Params>) => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.musicSearchService
      .getTrack(this.id)
      .subscribe((res: any) => this.renderTrack(res));
  }

  back(): void {
    this.location.back();
  }

  renderTrack(res: any): void {
    this.track = res;
  }
}
