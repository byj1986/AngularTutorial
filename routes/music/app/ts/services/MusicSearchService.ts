import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export abstract class MusicSearchService implements MusicSearch {
    abstract baseUrl: string;

    abstract test(query: string): void;

    abstract search(query: string, type: string): Observable<any[]>;

    abstract searchTrack(query: string): Observable<any[]>;

    abstract  getTrack(id: string): Observable<any[]>;

    abstract getArtist(id: string): Observable<any[]>;

    abstract  getAlbum(id: string): Observable<any[]>;
}


export interface MusicSearch {
    baseUrl: string;

    test(query: string): void;

    search(query: string, type: string): Observable<any[]>;

    searchTrack(query: string): Observable<any[]>;

    getTrack(id: string): Observable<any[]>;

    getArtist(id: string): Observable<any[]>;

    getAlbum(id: string): Observable<any[]>;
}