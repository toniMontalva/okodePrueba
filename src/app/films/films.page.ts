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
      if (this.loadedFilms.length <= 0) {
        this.noResults = true;
      }
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
      this.totalFilms = this.loadedFilms.length;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      throw new Error(error);
    });
  }

}
