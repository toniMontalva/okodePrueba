/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Film } from './film.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private _films = new BehaviorSubject<Film[]>([]);

  constructor(private http: HttpClient) {}

  get films() {
    return this._films.asObservable();
  }

  fetchFilmsByTitle(title: string) {
    const titleQuery = title.replace(' ','+');
    return this.http
      .get<Film[]>(
        `https://api.themoviedb.org/3/search/movie?api_key=${environment.movieDbAPIKey}&query`
      )
      .pipe(
        map((films) => {
          console.log(films);
        })
      );
  }
}
