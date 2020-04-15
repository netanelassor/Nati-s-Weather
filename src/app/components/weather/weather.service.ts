import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WeatherItemModel } from './models/weather-item.model';
import { CurrentWeather } from './models/current-weather.model';
import { DailyForecasts } from './models/daily-forecasts.model';
import { LocationModel } from './models/locations.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  selectedLocation$ = new BehaviorSubject<LocationModel>({
    Key: 215854,
    LocalizedName: "Tel Aviv",
    Country: {
      ID: "IL",
      LocalizedName: "Israel"
    }
  });

  constructor(
    private http: HttpClient
  ) { }

  getWeatherForecast(locationKey: number): Observable<any> {

    return this.http
      .get
      (
        environment.baseApiUrl +
        '/forecasts/v1/daily/5day/' + locationKey +
        '?apikey=' + environment.apiKey +
        '&metric=true'
      )
      .pipe(
        map((response: any) =>
          this.convertDailyWeatherToMainModel(response.DailyForecasts)
        ));
  }


  getLocationSuggestion(searchInput: string): Observable<any> {
    return this.http
      .get(
        environment.baseApiUrl +
        '/locations/v1/cities/autocomplete' +
        '?apikey=' + environment.apiKey +
        '&q=' + searchInput
      );
  }

  getCurrentWeatherByLocation(locationKey: number): Observable<any> {
    return this.http.get(
      environment.baseApiUrl +
      '/currentconditions/v1/' + locationKey +
      '?apikey=' + environment.apiKey
    ).pipe(
      map((currentWeather: any) =>
        this.convertCurrentWeatherToMainModel(currentWeather[0])
      ));
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

  setSelectedLocation(location: LocationModel): Observable<LocationModel> {
     this.selectedLocation$.next(location);
     return  this.selectedLocation$.asObservable();
  }
  getSelectedLocation(): Observable<LocationModel> {
    return  this.selectedLocation$.asObservable();
  }

}
