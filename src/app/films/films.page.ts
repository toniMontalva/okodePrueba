import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { FilmsService } from './films.service';
import { Film } from './film.model';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit, OnDestroy {
  loadedFilms: Film[];
  isLoading = false;
  totalFilms = 0;
  noResults = false;
  inputText = '';

  private fetchingSub: Subscription;

  constructor(
    private filmService: FilmsService
  ) {}

  ngOnInit() {
    this.fetchingSub = this.filmService.films.subscribe((films) => {
      this.loadedFilms = films;
    });
  }

  ngOnDestroy() {
    if (this.fetchingSub) {
      this.fetchingSub.unsubscribe();
    }
  }

  fetchFilms() {
    this.isLoading = true;
    this.filmService.fetchFilmsByTitle(this.inputText).subscribe(() => {
      this.totalFilms = this.filmService.totalResults;
      this.isLoading = false;
      if (this.loadedFilms.length <= 0) {
        this.noResults = true;
      }
    }, error => {
      this.isLoading = false;
      throw new Error(error);
    });
  }

}
