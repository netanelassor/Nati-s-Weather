import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { WeatherItemComponent } from './components/weather/weather-item/weather-item.component';
import { WeatherWeekViewComponent } from './components/weather/weather-week-view/weather-week-view.component';
import { WeatherIconComponent } from './controls/weather-icon/weather-icon.component';
import { MaterialModule } from './providers/material/material.module';
import { SearchLocationComponent } from './controls/search-location/search-location.component';
import { AddCityModalComponent } from './components/favorites/add-city-modal/add-city-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherWeekViewComponent,
    WeatherItemComponent,
    FavoritesComponent,
    WeatherIconComponent,
    SearchLocationComponent,
    AddCityModalComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
