import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import { MusicSearchService } from './MusicSearchService';

/**
 * SpotifyService works querying the Spotify Web API
 * https://developer.spotify.com/web-api/
 */

@Injectable()
export class iTunesService implements MusicSearchService {
    baseUrl: string = 'https://itunes.apple.com/';

    constructor(private http: Http) {
    }

    test(query: string): void {
        console.info('iTunesService.test');
    }

    query(URL: string, params?: Array<string>): Observable<any[]> {
        let queryURL: string = `${this.baseUrl}${URL}`;
        if (params) {
            queryURL = `${queryURL}?${params.join('&')}`;
        }
        console.info(queryURL);
        return this.http.request(queryURL).map((res: any) => res.json());
    }

    search(query: string, type: string): Observable<any[]> {
        // console.info('Use iTunesService');
        let results = this.query(`search`, [
            `term=${query.replace(' ', '+')}`,
        ]);
        results.subscribe(x => console.info(x));
        console.info(results);
        return results;
    }

    searchTrack(query: string): Observable<any[]> {
        return this.search(query, 'track');
    }

    getTrack(id: string): Observable<any[]> {
        return this.query(`/tracks/${id}`);
    }

    getArtist(id: string): Observable<any[]> {
        return this.query(`/artists/${id}`);
    }

    getAlbum(id: string): Observable<any[]> {
        return this.query(`/albums/${id}`);
    }
}

export var ITUNES_PROVIDERS: Array<any> = [
    { provide: iTunesService, useClass: iTunesService }
];
