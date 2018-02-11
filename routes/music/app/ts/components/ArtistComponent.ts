/*
 * Angular
 */
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

/*
 * Services
 */

import { MusicSearchService } from '..//services/MusicSearchService';

@Component({
  selector: 'artist',
  template: `
  <div *ngIf="artist">
    <h1>{{ artist.name }}</h1>

    <p>
      <img src="{{ artist.images[0].url }}">
    </p>

    <p><a href (click)="back()">Back</a></p>
  </div>
  `
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: Object;

  constructor(private route: ActivatedRoute,
    @Inject('MusicSearchService') private musicSearchService: MusicSearchService,
    private location: Location) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.musicSearchService
      .getArtist(this.id)
      .subscribe((res: any) => this.renderArtist(res));
  }

  back(): void {
    this.location.back();
  }

  renderArtist(res: any): void {
    this.artist = res;
  }
}
