import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmsPage } from './films.page';

const routes: Routes = [
  {
    path: '',
    component: FilmsPage
  },
  {
    path: 'film-detail',
    loadChildren: () => import('./film-detail/film-detail.module').then( m => m.FilmDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsPageRoutingModule {}
