import { TemperatureUnit } from './temperature.model';

export interface WeatherItemModel {
    date?: Date;
    temperature: Temperature;
    weatherIcon: number;
    weatherDescription: string;
}

export interface Temperature {
    min?: TemperatureUnit;
    max: TemperatureUnit;
}

