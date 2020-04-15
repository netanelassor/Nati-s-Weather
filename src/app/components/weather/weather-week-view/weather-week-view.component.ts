import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FavoritesService } from '../../favorites/favorites.service';
import { LocationModel } from '../models/locations.model';
import { WeatherItemModel } from '../models/weather-item.model';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-weather-week-view',
  templateUrl: './weather-week-view.component.html',
  styleUrls: ['./weather-week-view.component.scss']
})
export class WeatherWeekViewComponent implements OnInit {

  suggestedLocationList$: Observable<LocationModel[]>;
  weeklyData$: Observable<WeatherItemModel[]>;
  selectedLocation$: Observable<LocationModel>;

  searchControl = new FormControl();

  currentWeather: WeatherItemModel;
  favoriteIconState = "star";
  currentWeatherIcon: string;
  includedInFavorite = false;

  constructor(
    private weatherService: WeatherService,
    private favoriteService: FavoritesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.weatherService.findMe();
    this.selectedLocation$ = this.weatherService.getSelectedLocation();
    this.selectedLocation$.subscribe(
      location => {
        this.updateLocation(location);
      }
    );
  }

  getWeatherForecast(locationKey: number): void {
    this.weeklyData$ = this.weatherService.getWeatherForecast(locationKey);
  }

  getCurrentWeatherByLocation(locationKey: number): void {
    this.weatherService.getCurrentWeatherByLocation(locationKey).subscribe(result => {
      this.currentWeather = result;
      this.getCurrentWeatherImg();
    });
  }

  setLocationAsFavorite(): void {
    this.selectedLocation$.subscribe(
      location => {
        const success: boolean = this.favoriteService.addToFavorites(location);
        this.includedInFavorite = true;
        const message =
          success ? location.LocalizedName + ' added to favorites successfully' : 'Sorry, something went wrong, please try again';

        this.showToast(message);
      }
    );
  }

  updateLocation(location: LocationModel): void {
    this.getWeatherForecast(location.Key);
    this.getCurrentWeatherByLocation(location.Key);
    this.includedInFavorite = this.favoriteService.checkIfExist(location.Key);
  }



  /////Healper Functions/////

  displayFn(location: LocationModel): string {
    if (location) { return location.LocalizedName; }
  }

  showToast(message: string): void {
    this._snackBar.open(message, "", {
      duration: 2000,
    });
  }

  getCurrentWeatherImg() {
    switch (true) {
      case (this.currentWeather.weatherIcon <= 5):
        this.currentWeatherIcon = "assets/img/sunny.svg";
        break;

      case (this.currentWeather.weatherIcon === 6):
        this.currentWeatherIcon = "assets/img/sunny-cloudy.svg";
        break;

      case (this.currentWeather.weatherIcon <= 11):
        this.currentWeatherIcon = "assets/img/cloud.svg";

        break;

      case (this.currentWeather.weatherIcon <= 18):
        this.currentWeatherIcon = "assets/img/rain.svg";
        break;

      case (this.currentWeather.weatherIcon <= 24):
        this.currentWeatherIcon = "assets/img/rain.svg";
        break;

      case (this.currentWeather.weatherIcon <= 29):
        this.currentWeatherIcon = "assets/img/snow.svg";
        break;

      case (this.currentWeather.weatherIcon <= 30):
        this.currentWeatherIcon = "assets/img/sunny.svg";
        break;

      case (this.currentWeather.weatherIcon <= 44):
        this.currentWeatherIcon = "assets/img/night.svg";
        break;

      default:
        this.currentWeatherIcon = "assets/img/cloud.svg";
        break;
    }
  }


}
