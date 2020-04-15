import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherWeekViewComponent } from './components/weather/weather-week-view/weather-week-view.component';
import { FavoritesComponent } from './components/favorites/favorites.component';


const routes: Routes = [
  { path: 'home', component: WeatherWeekViewComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'favorites', component: FavoritesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
