import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Film } from '../film.model';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.page.html',
  styleUrls: ['./film-detail.page.scss'],
})
export class FilmDetailPage implements OnInit, OnDestroy {
  film: Film;
  isLoading = false;

  private fetchingSub: Subscription;

  constructor(
    private actRoute: ActivatedRoute,
    private navCtrl: NavController,
    private filmService: FilmsService
  ) {}

  ngOnInit() {
    this.actRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap) {
        this.navCtrl.navigateBack('/films/');
        return;
      }
      this.isLoading = true;

      // Guarda la pelicula seleccionada por el usuario
      this.fetchingSub = this.filmService.films.subscribe(
        (films) => {
          this.isLoading = false;
          this.film = films.find((film) => film.id === paramMap.get('id'));
        },
        (error) => {
          this.isLoading = false;
          throw new Error(error);
        }
      );
    });
  }

  // Cancela la subscripcion al observable para evitar pérdidas de memoria
  ngOnDestroy(): void {
    if (this.fetchingSub) {
      this.fetchingSub.unsubscribe();
    }
  }

  // Cambia la notación abreviada del idioma al nombre completo del mismo
  // Por completar para otros idiomas / Utilizar el módulo i18n
  fullLanguageString(lang: string): string {
    let langRes = lang;
    switch (lang) {
      case 'es':
        langRes = 'Español';
        break;
      case 'en':
        langRes = 'Inglés';
        break;
      case 'fr':
        langRes = 'Francés';
        break;
      default:
        break;
    }
    return langRes;
  }
}
