import { TemperatureCurrentWeather } from './temperature.model';

export interface CurrentWeather {
    LocalObservationDateTime: Date;
    WeatherText: string;
    WeatherIcon: number;
    Temperature: TemperatureCurrentWeather;
}





