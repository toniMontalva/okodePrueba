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

  private fetchingSub: Subscription;

  constructor(
    private filmService: FilmsService,
    private loadingCtrl: LoadingController
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

  // mientras se carga la vista y las películas, muestro un spinner
  ionViewWillEnter() {
    this.isLoading = true;
    this.filmService.fetchFilms().subscribe(() => {
      this.isLoading = false;
    });
  }
}
