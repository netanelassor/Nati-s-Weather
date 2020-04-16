import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationModel } from '../../../providers/models/locations.model';
import { WeatherItemModel } from '../../../providers/models/weather-item.model';
import { WeatherService } from '../weather.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss'],
  animations: [
    trigger('loadItemAnimation',
      [
        transition(':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.3s ease-out',
              style({ height: 300, opacity: 1 }))
          ]
        )
      ]
    )
  ]
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
