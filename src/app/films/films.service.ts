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
  totalResults: number;
  private _films = new BehaviorSubject<Film[]>([]);

  constructor(private http: HttpClient) {}

  get films() {
    return this._films.asObservable();
  }

  /**
   * @param title el título de la película
   * @returns Obtiene un listado (Observable) de películas que contienen el texto introducido en el título
   */
  fetchFilmsByTitle(title: string) {
    // Cambia el string con espacios a un formato amigable para la petición http
    const titleQuery = title.replace(' ', '+');
    return this.http
      .get<Film[]>(
        `https://api.themoviedb.org/3/search/movie?api_key=${environment.movieDbAPIKey}&query=${titleQuery}`
      )
      .pipe(
        map((films) => {
          const filmsRes = [];
          this.totalResults = films['total_results'];
          // Recorre el array de películas recibidas por la petición a la API
          for (const key in films['results']){
            filmsRes.push(
              new Film(
                key,
                films['results'][key].original_title,
                new Date(films['results'][key].release_date),
                films['results'][key].original_language,
                films['results'][key].overview,
                films['results'][key].poster_path
              )
            );
          }

          return filmsRes;
        }),
        // Actualiza el observable
        tap((filmsRes) => {
          this._films.next(filmsRes);
        })
      );
  }

}
