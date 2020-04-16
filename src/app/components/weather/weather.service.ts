import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WeatherItemModel } from '../../providers/models/weather-item.model';
import { CurrentWeather } from '../../providers/models/current-weather.model';
import { DailyForecasts } from '../../providers/models/daily-forecasts.model';
import { LocationModel } from '../../providers/models/locations.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  defaultLocation: LocationModel = {
    Key: 215854,
    LocalizedName: 'Tel Aviv',
    Country: {
      ID: 'IL',
      LocalizedName: 'Israel'
    }
  };

  private selectedLocationSubject = new BehaviorSubject<LocationModel>(this.defaultLocation);

  constructor(
    private http: HttpClient
  ) { }


  getWeatherForecast(locationKey: number): Observable<WeatherItemModel[]> {
    return this.http
      .get
      (
        `${environment.baseApiUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${environment.apiKey}&metric=true`
      )
      .pipe(
        map((response: any) =>
          this.convertDailyWeatherToMainModel(response.DailyForecasts)
        )
      );
  }


  getLocationSuggestion(searchInput: string): Observable<any> {
    return this.http
      .get(
        `${environment.baseApiUrl}/locations/v1/cities/autocomplete?apikey=${environment.apiKey}&q=${searchInput}`
      );
  }

  getCurrentWeatherByLocation(locationKey: number): Observable<WeatherItemModel> {
    return this.http.get(
      `${environment.baseApiUrl}/currentconditions/v1/${locationKey}?apikey=${environment.apiKey}`
    ).pipe(
      map((currentWeather: any) =>
        this.convertCurrentWeatherToMainModel(currentWeather[0])
      ));
  }

  getLocationKeyByGeoPosition(lat: number, lon: number): Observable<LocationModel> {
    return this.http
      .get(
        `${environment.baseApiUrl}/locations/v1/cities/geoposition/search?apikey=${environment.apiKey}&q=${lat},${lon}`
      ).pipe(
        map((result: any) =>
          this.convertLocationToMainModel(result)
        )
      );
  }

  convertCurrentWeatherToMainModel(currentWeather: CurrentWeather): WeatherItemModel {
    const weatherItem: WeatherItemModel = {
      date: currentWeather.LocalObservationDateTime,
      weatherIcon: currentWeather.WeatherIcon,
      weatherDescription: currentWeather.WeatherText,
      temperature: {
        max:
        {
          Value: currentWeather.Temperature.Metric.Value,
          Unit: currentWeather.Temperature.Metric.Unit,
          UnitType: currentWeather.Temperature.Metric.UnitType
        },
        min: null
      }
    };
    return weatherItem;
  }

  convertLocationToMainModel(location: any): LocationModel {
    const newLocationModel: LocationModel = {
      Key: location.Key,
      LocalizedName: location.LocalizedName,
      Country: {
        ID: location.Country.ID,
        LocalizedName: location.Country.LocalizedName
      }
    };
    return newLocationModel;
  }


  convertDailyWeatherToMainModel(dailyWeatherData: DailyForecasts[]): WeatherItemModel[] {
    const weatherItem: WeatherItemModel[] = dailyWeatherData.map(item => ({
      date: item.Date,
      weatherIcon: item.Day.Icon,
      weatherDescription: item.Day.IconPhrase,
      temperature: {
        max: item.Temperature.Maximum,
        min: item.Temperature.Minimum
      }
    }));
    return weatherItem;
  }


  //I've decided to marge some icons
  getCurrentWeatherIcon(weatherIcon: number) {
    if (weatherIcon <= 5) {
      return 'sunny';
    }
    if (weatherIcon === 6) {
      return 'sunny-cloudy';
    }
    if (weatherIcon <= 11) {
      return 'cloud';
    }
    if (weatherIcon <= 18) {
      return 'rain';
    }
    if (weatherIcon <= 29) {
      return 'snow';
    }
    if (weatherIcon <= 30) {
      return 'sunny';
    }
    if (weatherIcon <= 44) {
      return 'night';
    }
  }

}
