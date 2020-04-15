import { TemperatureDailyWeather } from './temperature.model';

export interface DailyForecasts {
    Date: Date;
    Temperature: TemperatureDailyWeather;
    Day: TemperatureDescription;
    Night: TemperatureDescription;
    Location?: string;
}


export interface TemperatureDescription {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
}


