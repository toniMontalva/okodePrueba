/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
    const titleQuery = title.replace(' ', '+');
    return this.http
      .get<Film[]>(
        `https://api.themoviedb.org/3/search/movie?api_key=${environment.movieDbAPIKey}&query=${titleQuery}`
      )
      .pipe(
        map((films) => {
          const filmsRes = [];
          for (const key in films['results']){
            console.log(key);
            console.log(films['results'][key]);

            filmsRes.push(
              new Film(
                key,
                films['results'][key].original_title,
                new Date(films['results'][key].release_date),
                films['results'][key].original_language,
                films['results'][key].overview
              )
            );
          }

          return filmsRes;
        }),
        tap((filmsRes) => {
          this._films.next(filmsRes);
        })
      );
  }

}
