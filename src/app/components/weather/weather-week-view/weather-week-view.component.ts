import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FavoritesService } from '../../favorites/favorites.service';
import { LocationModel } from '../../../providers/models/locations.model';
import { WeatherItemModel } from '../../../providers/models/weather-item.model';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-weather-week-view',
  templateUrl: './weather-week-view.component.html',
  styleUrls: ['./weather-week-view.component.scss']
})
export class WeatherWeekViewComponent implements OnInit {

  suggestedLocationList$: Observable<LocationModel[]>;
  weeklyData$: Observable<WeatherItemModel[]>;
  searchControl = new FormControl();

  selectedLocation: LocationModel;
  currentWeather: WeatherItemModel;
  currentWeatherIcon: string;
  includedInFavorite = false;

  constructor(
    private weatherService: WeatherService,
    private favoriteService: FavoritesService,
    private toastService: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.weatherService.getDeviceLocation();

    this.weatherService.getSelectedLocation().subscribe(
      (location: LocationModel) => {
        this.selectedLocation = location;
        this.updateLocation(location);
      });

  }

  getWeatherForecast(locationKey: number): void {
    this.weeklyData$ = this.weatherService.getWeatherForecast(locationKey);
  }

  getCurrentWeatherByLocation(locationKey: number): void {
    this.weatherService.getCurrentWeatherByLocation(locationKey).subscribe(result => {
      this.currentWeather = result;
      this.currentWeatherIcon = `assets/img/${this.weatherService.getCurrentWeatherIcon(this.currentWeather.weatherIcon)}.svg`;
    });
  }

  setLocationAsFavorite(): void {

    const success: boolean = this.favoriteService.addToFavorites(this.selectedLocation);
    this.includedInFavorite = success;
    const message =
      success ? this.selectedLocation.LocalizedName + ' added to favorites successfully' : 'Sorry, something went wrong, please try again';

    this.showToast(message);
  }

  updateLocation(location: LocationModel): void {
    this.getWeatherForecast(location.Key);
    this.getCurrentWeatherByLocation(location.Key);
    this.includedInFavorite = this.favoriteService.checkIfExist(location.Key);
  }

  /////Healper Functions/////

  showToast(message: string): void {
    this.toastService.open(message, '', {
      duration: 2000,
    });
  }

}
