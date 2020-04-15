import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesService } from '../../favorites/favorites.service';
import { LocationModel } from '../models/locations.model';
import { WeatherItemModel } from '../models/weather-item.model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  @Input() weatherItem?: WeatherItemModel;
  @Input() locationData: LocationModel = null;
  @Input() useCurrentWeather = false;

  isDataReady = false;
  includedInFavorite = false;

  constructor(
    private weatherService: WeatherService,
    private favoriteService: FavoritesService,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    if (this.useCurrentWeather && this.locationData) {
      this.getCurrentWeather();
      this.checkIfIncludedInFavorite();
    } else {
      this.isDataReady = true;
    }
  }

  checkIfIncludedInFavorite() {
    this.includedInFavorite = this.favoriteService.checkIfExist(this.locationData.Key);
  }

  removeFromFavorite() {
    this.favoriteService.removeFromFavorite(this.locationData.Key);
    const message = this.locationData.LocalizedName + ' has been removed';
    this.showToast(message);
  }

  getCurrentWeather() {
    this.weatherService.getCurrentWeatherByLocation(this.locationData.Key).subscribe(result => {
      this.weatherItem = result;
      this.isDataReady = true;
    });
  }

  showToast(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }



}
