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
    UnitType: UnitType;
}

export enum UnitType {
    Feet = 0,
    Inches = 1,
    Miles = 2,
    Millimeter = 3,
    Centimeter = 4,
    Meter = 5,
    Kilometer = 6,
    KilometersPerHour = 7,
    Knots = 8,
    MilesPerHour = 9,
    MetersPerSecond = 10,
    HectoPascals = 11,
    InchesOfMercury = 12,
    KiloPascals = 13,
    Millibars = 14,
    MillimetersOfMercury = 15,
    PoundsPerSquareInch = 16,
    Celsius = 17,
    Fahrenheit = 18,
    Kelvin = 19,
    Percent = 20,
    Float = 21,
    Integer = 22
}
