export interface TemperatureCurrentWeather {
    Metric: TemperatureUnit;
    Imperial: TemperatureUnit;
}

export interface TemperatureDailyWeather {
    Minimum: TemperatureUnit;
    Maximum: TemperatureUnit;
}

export interface TemperatureUnit {
    Value: number;
    Unit: string;
    UnitType: number;
}
