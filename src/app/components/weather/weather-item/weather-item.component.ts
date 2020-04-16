import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesService } from '../../favorites/favorites.service';
import { LocationModel } from '../../../providers/models/locations.model';
import { WeatherItemModel } from '../../../providers/models/weather-item.model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  @Input() weatherItem?: WeatherItemModel;
  @Input() locationData: LocationModel = null;
  @Input() isFavoriteContext = false;
  @Output() removeFromFavorite: EventEmitter<void> = new EventEmitter();

  isDataReady = false;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    if (this.isFavoriteContext && this.locationData) {
      this.getCurrentWeather();
    } else {
      this.isDataReady = true;
    }
  }

  clickOnRemoveFromFavorite() {
    this.removeFromFavorite.emit();
  }

  getCurrentWeather() {
    this.weatherService.getCurrentWeatherByLocation(this.locationData.Key).subscribe(result => {
      this.weatherItem = result;
      this.isDataReady = true;
    });
  }

}
